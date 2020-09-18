export class ApiError extends Error {
    path: string = "";
    httpStatus = "";
    
    constructor(message?: string, path="", httpStatus="") {
        super(message);
        this.path = path;
        this.httpStatus = httpStatus;
    }
}