import { Action } from "redux";
import { ApiError } from "../../models/ApiError";

export interface IErrorAction extends Action {
    type: string;
    error: ApiError | Error | null;
}

export function errorAction(type: string, error: ApiError | Error): IErrorAction {
    return {
        type: type,
        error: error
    }
}