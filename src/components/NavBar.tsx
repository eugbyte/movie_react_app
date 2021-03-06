import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Navbar, Nav } from 'react-bootstrap';
import "./NavBar.css";


export function NavBar() {
  
  const classes = useStyles();

  return (
    <div>
      <Navbar expand="lg" variant="dark" style={{backgroundColor: "#3f51b5"}}>
          <Navbar.Brand>Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Button color="inherit" ><NavLink to="/" className={classes.navLink} >Home</NavLink></Button>
              </Nav>          
          </Navbar.Collapse>
      </Navbar>
      <br/>
    </div>
  );
}
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLink: {
        color: "white",
        textDecoration: "inherit",
        
    }
  }),
);