import React, { useContext } from "react";
import {Home, Login, Messenger, Profile, Register} from './pages';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'; 
import { AuthContext } from "./Context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
           <Messenger />
          {/* {!user ? <Redirect to="/" /> : <Messenger />} */}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
