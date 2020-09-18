import React, { useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import { RootState } from "../store/rootReducer";
import { fetchMoviesAsync } from "../store/thunks/movieThunk";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { CardComponent } from "../components/CardComponent";
import { useHistory } from "react-router-dom";
import { Container, Typography, Select } from "@material-ui/core";
import { ApiError } from "../models/ApiError";
import CircularProgress from '@material-ui/core/CircularProgress';
import { cloneDeep } from "lodash";

export function HomePage(): JSX.Element {
    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch(); 
    const history = useHistory();  

    // Single source of truth, immutable
    const immutableMovies: Movie[] = useSelector((action: RootState) => action.movieReducer.movies as Movie[]) ?? [];

    // Errors received if any
    // To display error notification
    const error: ApiError | Error | null = useSelector((action: RootState) => action.errorReducer.error) ?? null;

    // Mutable states for filtering purposes
    const [movies, setMovies] = useState<Movie[]>([]);   
    const [year, setYear] = useState<number>();
    let yearOptions: number[] = [];
    const [genre, setGenre] = useState<string>();
    let genreOptions: string[] = []; 

    // Only on the first mount, GET movies
    useEffect(() => {
        const action = fetchMoviesAsync();
        dispatch(action);
    }, []);

    // Upon receiving an error, display notification
    useEffect(()=> {
        if (error) {
            console.log("in HomePage. Errors:", error);
        }
    }, [error]);

    // Upon receiving GET results of movies
    useEffect(() => {
        setMovies(cloneDeep(immutableMovies));

        yearOptions = immutableMovies.map(movie => movie.productionYear);
        genreOptions = immutableMovies.map(movie => movie.genre);
        console.log(immutableMovies);
    }, [immutableMovies.length]);

    const cards: JSX.Element[] = [];

    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        let textDict: Record<string, string | number> = {
            "Year": movie.productionYear,
            "Genre": movie.genre,
            "Summary": movie.synopsisShort
        }

        const card: JSX.Element = <Grid item xs={12} sm={4} lg={3} key={i}>
            <CardComponent title={movie.name} textDict={textDict} imgUrl={movie.image} actionTitle={"View More"}/>
        </Grid>
        cards.push(card);
    }

    useEffect(() => {
        console.log(movies);
    }, [movies.length]);
    
    return <div>
        <Typography color="primary" align="center" variant="h3">Home</Typography>
        <Grid container spacing={2}>
            <Grid item xs={3}>
            </Grid>
         </Grid>
        { movies.length > 0 &&
            <Grid className={classes.fullWidth}
                container
                spacing={2}
                >   
                {cards}                 
            </Grid>     
        }
        { movies.length === 0 && (!error) &&
            <Container>
                <CircularProgress/>
            </Container>
        }
        
    </div>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typo: {
       fontVariant: "body2",
       color: "textSecondary",
       component: "p",
       align: "left"
    },
    fullWidth: {
        width: "100vw",
        margin: "auto"
    }
  })
);