import React from 'react';
import './App.css';
import { HomePage } from './containers/HomePage';
import { Route } from 'react-router-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MovieDetailPage } from './containers/MovieDetailPage';

function App(): JSX.Element {
  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/movieDetail/:movieName" component={ MovieDetailPage } />
          <Route exact path="/" component={ HomePage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
