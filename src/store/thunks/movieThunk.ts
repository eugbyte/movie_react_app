import { Action } from "redux";
import { Movie } from "../../models/Movie";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ACTIONS } from "../actionEnums";
import { HTTP } from "../httpEnums";
import { ApiError } from "../../models/ApiError";
import { errorAction, IErrorAction } from "../actions/errorAction";

export interface IMovieAction extends Action {
    type: string;
    movie?: Movie | null;
    movies?: Movie[];
    message?: string;    // All internal messages
    httpMessage?: string;    //All message relating to API calls
}

export function fetchMoviesAsync(): ThunkAction<Promise<void>, {}, {}, IMovieAction | IErrorAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IMovieAction | IErrorAction>) => {
        dispatch({ type: ACTIONS.FETCH_MOVIES_REQUEST, message: "Making GET Request to fetch movies" });

        let polls = 0;
        let maxRetry = 2;
        const url = "https://sometimes-maybe-flaky-api.gdshive.io/";

        try {
            let response: Response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            polls += 1;

            while (!response.ok && polls < maxRetry) {
                console.log("ERROR ", response.statusText, " retrying now");
                response = await fetch(url, {
                    headers: { 'Content-Type': 'application/json' }
                });
                polls += 1;
            }

            if (!response.ok) {
                let errorBody: Error = await response.json();
                let apiError: ApiError = new ApiError(JSON.stringify(errorBody), url, response.statusText); 
                throw apiError;
            }

            const movies: Movie[] = await response.json();
            dispatch({ type: ACTIONS.FETCH_MOVIES_RECEIVED, httpMessages: [HTTP.GET_OK], movies: movies });
        } catch (error) {
            dispatch(errorAction(HTTP.GET_ERROR, error as Error));
        }
    }
}