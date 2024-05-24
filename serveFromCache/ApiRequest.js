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
const axios_1 = __importDefault(require("axios"));
class ApiRequestWithFetch {
    constructor() {
        this.requestMethod = "axios";
        this.apiUrl = "https://www.googleapis.com/books/v1/volumes";
    }
    setApiUrl(apiUrl) {
        this.apiUrl = apiUrl;
    }
    getApiUrlWithQuery(query) {
        return this.apiUrl + "?q=" + query;
    }
    getData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.requestMethod === "fetch") {
                const result = yield (yield fetch(this.getApiUrlWithQuery(query))).json();
                return JSON.stringify(result.data);
            }
            const { data } = yield axios_1.default.get(this.getApiUrlWithQuery(query));
            return JSON.stringify(data);
        });
    }
}
exports.default = ApiRequestWithFetch;
