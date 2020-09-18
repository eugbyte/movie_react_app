import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IProp {
    state: any;
    options: any[];
    handleChange: () => any | void;
}

export function SelectComponent({state, options, handleChange}: IProp): JSX.Element {
    const classes = useStyles();

    return <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            onChange={handleChange} > 
        {
            options.map(option => <MenuItem value={option}>option</MenuItem>)
        } 
        </Select>
  </FormControl>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);