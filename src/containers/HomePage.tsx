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
import { Container, Typography } from "@material-ui/core";
import { ApiError } from "../models/ApiError";
import CircularProgress from '@material-ui/core/CircularProgress';
import { cloneDeep } from "lodash";
import { SelectComponent } from "../components/SelectComponent";
import { ErrorNotification } from "../components/ErrorNotification";
import { getImgUrl } from "../components/PictureUrlDict";

export function HomePage(): JSX.Element {
    document.title = "Home Page";

    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch(); 
    const history = useHistory();  

    // Single source of truth, immutable
    const immutableMovies: Movie[] = useSelector((action: RootState) => action.movieReducer.movies as Movie[]) ?? [];
    //Error received from API call
    const error: ApiError | Error | null = useSelector((action: RootState) => action.errorReducer.error) ?? null;

    // Mutable movies for filtering purposes
    const [movies, setMovies] = useState<Movie[]>([]);   

    // Year filter
    const [year, setYear] = useState<number>();
    let yearOptions: number[] = immutableMovies.map(movie => movie.productionYear);
    yearOptions = [...new Set(yearOptions)];
    yearOptions.sort();
    const handleChangeYear = (event: React.ChangeEvent<any>) => {
        let selectedYear: number = event.target.value;
        setYear(selectedYear);
    }

    // Genre filter
    const [genre, setGenre] = useState<string>();
    let genreOptions: string[] = immutableMovies.map(movie => movie.genre);
    genreOptions = [...new Set(genreOptions)];
    genreOptions.sort();
    const handleChangeGenre = (event: React.ChangeEvent<any>) => {
        let selectedGenre: string = event.target.value;
        setGenre(selectedGenre);
    }

    // Whenever year or genre changes, filter the movie
    const filterMoviesOnChange = () => {
        let resultMovies: Movie[] = immutableMovies
            .filter(movie => year ? movie.productionYear === year : true)
            .filter(movie => genre ? movie.genre === genre : true);
        setMovies(resultMovies);
    }
    useEffect(() => {
        filterMoviesOnChange();
    }, [year, genre])

    // Only on the first mount, GET movies
    useEffect(() => {
        const action = fetchMoviesAsync();
        dispatch(action);
    }, []);    

    // Upon receiving GET results of movies
    useEffect(() => {
        setMovies(cloneDeep(immutableMovies));
    }, [immutableMovies.length]);    

    // Render the movie cards
    const cards: JSX.Element[] = [];

    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        let textDict: Record<string, string | number> = {
            "Year": movie.productionYear,
            "Genre": movie.genre,
            "Summary": movie.synopsisShort
        }

        const redirectToMovieDetailPage = () => {
            history.push("movieDetail/" + movie.name);
        }

        const card: JSX.Element = <Grid item xs={12} sm={5} lg={4} key={i}> 
            <CardComponent title={movie.name} textDict={textDict} imgUrl={getImgUrl(movie.image)} 
                actionTitle={"View More"} action={redirectToMovieDetailPage}/>
        </Grid>
        cards.push(card);
    }

    return <Container maxWidth="lg">
        <Typography color="primary" align="center" variant="h3">Home</Typography>
        
        { movies.length > 0 &&
        <div>
            <Grid container spacing={2} justify="center">
                
                <Grid item xs={2}>
                    <SelectComponent title={"Year"} state={year} options={yearOptions} handleChange={handleChangeYear} />
                </Grid>
                <Grid item xs={2}>
                    <SelectComponent title={"Genre"} state={genre} options={genreOptions} handleChange={handleChangeGenre} />
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
            <br/>
            <Grid
                className={classes.fullWidth}
                container
                justify="flex-start"                
                spacing={2} >   
                {cards}                 
            </Grid>     
        </div>
        }
        { immutableMovies.length === 0 && (!error) &&
                <Grid container direction="row"
                    alignItems="flex-end" justify="center">
                        <div style={{ display: "block", height:"200px" }}></div>
                        <CircularProgress size={80}/>
                    
                </Grid>
        }

       <ErrorNotification error={error}/>
        
    </Container>
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
        //width: "100vw",
        margin: "auto"
    }
  })
);
 