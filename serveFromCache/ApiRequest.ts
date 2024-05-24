
import axios from "axios";

interface IApiRequest {
    setApiUrl(apiUrl: string): void
    getData(query: string): Promise<string>
}
type RequestType = "axios" | "fetch"

export default class ApiRequestWithFetch implements IApiRequest {
    private apiUrl: string
    private requestMethod: RequestType
    constructor() {
        this.requestMethod = "axios"
        this.apiUrl = "https://www.googleapis.com/books/v1/volumes"
    }

    setApiUrl(apiUrl: string): void {
        this.apiUrl = apiUrl
    }
    private getApiUrlWithQuery(query: string): string {
        return this.apiUrl + "?q=" + query
    }

    async getData(query: string): Promise<string> {
        if (this.requestMethod === "fetch") {
            const result = await (await fetch(this.getApiUrlWithQuery(query))).json()
            return JSON.stringify(result.data)
        }
        const { data } = await axios.get(this.getApiUrlWithQuery(query))
        return JSON.stringify(data)
    }
}