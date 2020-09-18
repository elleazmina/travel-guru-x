import React, { createContext, useState } from 'react';
import './App.css';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import NoMatch from './components/NoMatch/NoMatch';
import RoomDetails from './components/RoomDetails/RoomDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>Email:{loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>

          <Route exact path="/">
          
          <Destination></Destination>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/booking">
            <RoomDetails></RoomDetails>
            </PrivateRoute> 

          <Route path="/place/:placeId">
            <PlaceDetails></PlaceDetails>
          </Route>


          <Route path="*">
            <NoMatch></NoMatch>
          </Route>

        </Switch>
      </Router>
      
      </UserContext.Provider>
  );
}

export default App;
