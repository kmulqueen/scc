import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStickings } from "./redux/actions/stickingsActions";
import { db, auth } from "./firebase";
import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import StickControlExercise from "./components/StickControlExercise";
import Controls from "./components/Controls";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route
            exact
            path="/exercises"
            component={StickControlExercise}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
