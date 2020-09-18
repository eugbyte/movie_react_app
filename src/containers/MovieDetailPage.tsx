import React, { useEffect } from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import { Movie } from "../models/Movie";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../store/rootReducer";
import { useParams } from "react-router-dom";
import { CardComponent } from "../components/CardComponent";
import Grid from '@material-ui/core/Grid';
import { fetchMoviesAsync } from "../store/thunks/movieThunk";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
        // When the user refreshes the page, need to make the API call again. Otherwise just retrieve movies already loaded from the store
        if (immutableMovies.length === 0) {
            const action = fetchMoviesAsync();
            dispatch(action);
        }
    }, [])
    {/* <Typography color="primary" align="center" variant="h3">Movie Detail</Typography> */}

    return <div> 
        <Grid container spacing={3} justify="center">
            <Grid item xs={5}>
                <CardComponent title={movie.name} textDict={textDict} imgUrl={movie.image} showAccordion={true} accordionText={movie.synopsis} />
            </Grid>
        </Grid> 
    </div>


}
