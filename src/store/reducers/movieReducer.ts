import { IMovieAction } from "../thunks/movieThunk";
import { cloneDeep } from "lodash";
import { ACTIONS} from "../actionEnums";

const initialState : IMovieAction = {
    type: "",
    movie: null,
    movies: [],
    message: "",
    httpMessage: ""
}

export function movieReducer(prevState=initialState, action: IMovieAction): IMovieAction {
    let newState: IMovieAction = cloneDeep(prevState);

    newState.type = action.type;
    newState.message = action.message + " " + (new Date()).toString();
    newState.message = action.message + " " + (new Date()).toString();

    console.log("in bidReducer. latest message:", newState.message);
    console.log("in bidReducer. latest httpMessage", newState.httpMessage);

    switch(action.type) {
        case(ACTIONS.FETCH_MOVIES_REQUEST):
            return newState;
        case(ACTIONS.FETCH_MOVIES_RECEIVED):
            newState.movies = action.movies;
            return newState;
        default:
            return prevState;
    }
}