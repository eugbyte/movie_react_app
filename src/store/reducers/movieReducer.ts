import { IMovieAction } from "../thunks/movieThunk";
import { cloneDeep } from "lodash";
import { ACTIONS} from "../actionEnums";

const initialState : IMovieAction = {
    type: "",
    movie: null,
    movies: [],
    messages: [],
    httpMessages: []
}

export function movieReducer(prevState=initialState, action: IMovieAction): IMovieAction {
    let newState: IMovieAction = cloneDeep(prevState);

    newState.type = action.type;
    newState.messages = newState.messages?.concat(action.messages ?? []) as string[];
    newState.httpMessages = newState.httpMessages?.concat(action.httpMessages ?? []) as string[];

    console.log("in bidReducer. latest message:", newState.messages[(newState.messages?.length ?? 1) - 1]);
    console.log("in bidReducer. latest httpMessage", newState.httpMessages[(newState.httpMessages?.length ?? 1) - 1]);

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