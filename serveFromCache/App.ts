import ApiRequest from "./ApiRequest"
import FileSystem from "./FileSystem"
import readline from 'node:readline'


interface ICacheApp {
    setDateDifferenceInSeconds(seconds: number): void
    serve(query: string, force?: "force"): Promise<string>
}

class CacheApp implements ICacheApp {
    private fileSystem: FileSystem
    private approvedDateDifferenceInSeconds: number
    private requestData: ApiRequest

    constructor(requestData: ApiRequest) {
        this.fileSystem = new FileSystem()
        this.approvedDateDifferenceInSeconds = 10
        this.requestData = requestData
    }
    private setQuery(query: string): void {
        this.fileSystem.setQuery(query)
    }

    private getDateDifference(date: Date): number {
        const currentDate: Date = new Date()
        const dateDifference: number = (currentDate.getTime() - date.getTime()) / 1000
        console.log(dateDifference)
        return dateDifference
    }

    private async ableToUseCache(): Promise<boolean> {
        const lastModifyDate: Date = await this.fileSystem.getFileModifyDate()
        const dateDifference = this.getDateDifference(lastModifyDate)
        return dateDifference < this.approvedDateDifferenceInSeconds
    }

    async serve(query: string, force?: "force"): Promise<string> {
        this.fileSystem.setQuery(query)

        if (!force && this.fileSystem.checkIfFileExist()) {
            if (await this.ableToUseCache()) {
                console.log("Reading chached file")
                const result = await this.fileSystem.readFile()
                return JSON.stringify(result)
            }
        }
        console.log("creating new chache")
        const result = await this.requestData.getData(query)
        this.fileSystem.saveToFile(result)


        this.fileSystem.clearQuery()

        return result
    }

    setDateDifferenceInSeconds(seconds: number): void {
        this.approvedDateDifferenceInSeconds = seconds
    }

}

const App = new CacheApp(new ApiRequest)

const getTitlesFromJson = (jsonData: string): string[] => {
    const parsed = JSON.parse(jsonData);
    return parsed.items.reduce((acc: string[], current: any) => {
        if (current.volumeInfo && current.volumeInfo.title) {
            acc.push(current.volumeInfo.title);
        }
        return acc;
    }, []);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`Input title or author name:   `, value => {
    App.serve(value).then(response => console.log(getTitlesFromJson(response))).catch(error => console.log(error))
    rl.close();
});
// App.setDateDifferenceInSeconds(15)

