import { ACTIONS } from "../actionEnums";
import { IErrorAction } from "../actions/errorAction";

const initialState: IErrorAction = {
    type: "",
    error: null
}

export function errorReducer(prevState=initialState, action: IErrorAction): IErrorAction {
    const { type, error } = action;

    // Must remember to clear all errors before redirecting to another page, otherwise errors will persists
    if (type === ACTIONS.CLEAR_ERROR) {
        return initialState;
    } else if (error) {
        console.log("in errorReducer. error occured: ", error);
        return {
            type: type,
            error: error
        }     
    }

    //For any start and finished actions that don't have errors we return the current state.
    return prevState;
}