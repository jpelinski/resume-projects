"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRequest_1 = __importDefault(require("./ApiRequest"));
const FileSystem_1 = __importDefault(require("./FileSystem"));
const node_readline_1 = __importDefault(require("node:readline"));
class CacheApp {
    constructor(requestData) {
        this.fileSystem = new FileSystem_1.default();
        this.approvedDateDifferenceInSeconds = 10;
        this.requestData = requestData;
    }
    setQuery(query) {
        this.fileSystem.setQuery(query);
    }
    getDateDifference(date) {
        const currentDate = new Date();
        const dateDifference = (currentDate.getTime() - date.getTime()) / 1000;
        console.log(dateDifference);
        return dateDifference;
    }
    ableToUseCache() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastModifyDate = yield this.fileSystem.getFileModifyDate();
            const dateDifference = this.getDateDifference(lastModifyDate);
            return dateDifference < this.approvedDateDifferenceInSeconds;
        });
    }
    serve(query, force) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fileSystem.setQuery(query);
            if (!force && this.fileSystem.checkIfFileExist()) {
                if (yield this.ableToUseCache()) {
                    console.log("Reading chached file");
                    const result = yield this.fileSystem.readFile();
                    return JSON.stringify(result);
                }
            }
            console.log("creating new chache");
            const result = yield this.requestData.getData(query);
            this.fileSystem.saveToFile(result);
            this.fileSystem.clearQuery();
            return result;
        });
    }
    setDateDifferenceInSeconds(seconds) {
        this.approvedDateDifferenceInSeconds = seconds;
    }
}
const App = new CacheApp(new ApiRequest_1.default);
const getTitlesFromJson = (jsonData) => {
    const parsed = JSON.parse(jsonData);
    return parsed.items.reduce((acc, current) => {
        if (current.volumeInfo && current.volumeInfo.title) {
            acc.push(current.volumeInfo.title);
        }
        return acc;
    }, []);
};
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`Input title or author name:   `, value => {
    App.serve(value).then(response => console.log(getTitlesFromJson(response))).catch(error => console.log(error));
    rl.close();
});
// App.setDateDifferenceInSeconds(15)
