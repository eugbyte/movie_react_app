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
import { Container, Typography, Snackbar } from "@material-ui/core";
import { ApiError } from "../models/ApiError";
import CircularProgress from '@material-ui/core/CircularProgress';
import { cloneDeep } from "lodash";
import { SelectComponent } from "../components/SelectComponent";
import { errorAction } from "../store/actions/errorAction";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ACTIONS } from "../store/actionEnums";

export function HomePage(): JSX.Element {
    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch(); 
    const history = useHistory();  

    // Single source of truth, immutable
    const immutableMovies: Movie[] = useSelector((action: RootState) => action.movieReducer.movies as Movie[]) ?? [];

    // API Errors received if any
    // To display error notification
    const error: ApiError | Error | null = useSelector((action: RootState) => action.errorReducer.error) ?? null;
    const [openAlert, setOpenAlert] = useState<boolean>(false); 
    const handleCloseAlert = () => {
        setOpenAlert(false);
        const cleanUpErrorAction = errorAction(ACTIONS.CLEAR_ERROR, error as ApiError | Error);
        dispatch(cleanUpErrorAction);
    }

    useEffect(()=> {
        if (error) {
            console.log("in HomePage. Errors:", error);
            setOpenAlert(true);
        }
    }, [error]);

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

    

    const cards: JSX.Element[] = [];

    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        let textDict: Record<string, string | number> = {
            "Year": movie.productionYear,
            "Genre": movie.genre,
            "Summary": movie.synopsisShort
        }

        const redirectToMovieDetailPage = () => {
            console.log("redirecting...");
            history.push("movieDetail/" + movie.name);
        }

        const card: JSX.Element = <Grid item xs={12} sm={4} lg={3} key={i}> 
            <CardComponent title={movie.name} textDict={textDict} imgUrl={movie.image} actionTitle={"View More"} action={redirectToMovieDetailPage}/>
        </Grid>
        cards.push(card);
    }

    return <div style={{ width: "100vw" }}>
        <Typography color="primary" align="center" variant="h3">Home</Typography>
        
        { movies.length > 0 &&
        <div>
            <Grid container spacing={1} justify="center">
                
                <Grid item xs={3}>
                        <SelectComponent title={"Year"} state={year} options={yearOptions} handleChange={handleChangeYear} />
                    </Grid>
                    <Grid item xs={3}>
                        <SelectComponent title={"Genre"} state={genre} options={genreOptions} handleChange={handleChangeGenre} />
                    </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
            <Grid
                className={classes.fullWidth}
                container
                justify="center"                
                spacing={2} >   
                {cards}                 
            </Grid>     
        </div>
        }
        { immutableMovies.length === 0 && (!error) &&
            <Container>
                <CircularProgress/>
            </Container>
        }

       <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert severity="error" onClose={handleCloseAlert}>Error fetching results! Try refreshing the page</Alert>
      </Snackbar>

        
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
        //width: "100vw",
        margin: "auto"
    }
  })
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }