import * as fs from "fs"

interface IFileSystem {
    setQuery(query: string): void
    saveToFile(recievedData: string, query: string): void
    readFile(query: string): Promise<string>
    getFileModifyDate(query: string): Promise<Date>
    checkIfFileExist(query: string): boolean | void
}

export default class FileSystem implements IFileSystem {
    private query: string
    constructor() {
        this.query = ""
    }

    private getFilePath() {
        const filename = this.query.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        return __dirname + `/cache/${filename}.json`
    }
    setQuery(query: string): void {
        this.query = query
    }
    clearQuery(): void {
        this.query = ""
    }
    saveToFile(recievedData: string): void {

        fs.writeFileSync(this.getFilePath(), recievedData)
    }

    async readFile(): Promise<string> {
        try {
            const fileData = await fs.promises.readFile(this.getFilePath())
            const result: string = JSON.parse(fileData.toString())
            return result
        }
        catch (error) {
            throw error
        }
    }

    async getFileModifyDate(): Promise<Date> {
        try {
            const stats = await fs.promises.stat(this.getFilePath())
            return stats.mtime
        }

        catch (error) {
            console.log(error)
            throw error
        }
    }

    checkIfFileExist(): boolean | void {
        try {
            const fileExist: boolean = fs.existsSync(this.getFilePath())
            if (fileExist) {
                return fileExist
            }
        }
        catch (error) {
            console.log(error)

        }
    }
}