import React, { useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../store/rootReducer";
import { useParams } from "react-router-dom";
import { CardComponent } from "../components/CardComponent";
import Grid from '@material-ui/core/Grid';
import { fetchMoviesAsync } from "../store/thunks/movieThunk";
import { ApiError } from "../models/ApiError";
import { ErrorNotification } from "../components/ErrorNotification";
import { getImgUrl } from "../components/PictureUrlDict";
import { Container } from "@material-ui/core";

export function MovieDetailPage(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch(); 

    // movieName parse from route parameter
    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;
    const movieName: string = routeParams["movieName"];

    const immutableMovies: Movie[] = useSelector((action: RootState) => action.movieReducer.movies as Movie[]) ?? [];
    const movie: Movie | undefined = immutableMovies.find(m => m.name === movieName) ?? new Movie();

    let textDict: Record<string, string | number> = {
        "Year": movie.productionYear,
        "Genre": movie.genre,
        "Summary": movie.synopsisShort
    } 

    useEffect(() => {
        // When the user refreshes the page, need to make the API call again. 
        // Otherwise just retrieve movies already loaded from the store through the home page
        if (immutableMovies.length === 0) {
            const action = fetchMoviesAsync();
            dispatch(action);
        }
    }, []);

    // To handle the error incase user refreshes page, and receives error on GET request
    // API Errors received if any
    // To display error notification
    const error: ApiError | Error | null = useSelector((action: RootState) => action.errorReducer.error) ?? null;
    
    movie.synopsis = setLineBreak(movie.synopsis);

    return <Container> 
        <Grid container spacing={3} justify="center">
            <Grid item >
                <CardComponent title={movie.name} textDict={textDict} imgUrl={getImgUrl(movie.image)} showAccordion={true} accordionText={movie.synopsis} />
            </Grid>
        </Grid> 
        <ErrorNotification error={error}/>
    </Container>


}

// Synopsis contains html <br /> tags
// Convert each of it to \n
function setLineBreak(text: string): string {
    return text.replaceAll('<br />', '\n');
}