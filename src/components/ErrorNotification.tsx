import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ApiError } from "../models/ApiError";
import { errorAction } from "../store/actions/errorAction";
import { ACTIONS } from "../store/actionEnums";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface IProp {
    autoHideDuration?: number;
    error: ApiError | Error | null
}

// Stateful component
// Parent component does not need to hold the showAlert in its state
export function ErrorNotification({error, autoHideDuration=6000}: IProp): JSX.Element {
    // API Errors received if any
    // To display error notification
    const dispatch: Dispatch<any> = useDispatch(); 
    const [openAlert, setOpenAlert] = useState<boolean>(false); 
    const handleCloseAlert = () => {
        setOpenAlert(false);
        const cleanUpErrorAction = errorAction(ACTIONS.CLEAR_ERROR, error as ApiError | Error);
        dispatch(cleanUpErrorAction);
    }

    useEffect(()=> {
        if (error) {
            setOpenAlert(true);
        }
    }, [error]);
    return <Snackbar open={openAlert} autoHideDuration={autoHideDuration} onClose={handleCloseAlert}>
    <Alert severity="error" onClose={handleCloseAlert}>Error fetching results! Try refreshing the page</Alert>
</Snackbar>
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }