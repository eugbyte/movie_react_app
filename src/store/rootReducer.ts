import { combineReducers } from 'redux';
import { movieReducer } from "./reducers/movieReducer";
import { errorReducer } from "./reducers/errorReducer";

export const rootReducer = combineReducers({
    movieReducer,
    errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;