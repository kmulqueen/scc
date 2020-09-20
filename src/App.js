import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStickings } from "./redux/actions/stickingsActions";
import { db, auth } from "./firebase";
import "./App.scss";

import Header from "./components/Header";
import StickControlExercise from "./components/StickControlExercise";
import Controls from "./components/Controls";
import Register from "./components/Register";
import Login from "./components/Login";
import Shapes from "./components/Shapes";

function App() {
  const dispatch = useDispatch();
  const pattern = useSelector((state) => state.stickings.pattern);

  useEffect(() => {
    const getData = async () => {
      const sbcArr = [];
      const fbArr = [];
      const sbcs = await db.collection("singleBeatCombinations").get();
      sbcs.forEach((sticking) => {
        const newItem = { ...sticking.data(), id: sticking.id };
        sbcArr.push(newItem);
      });
      const fbs = await db.collection("flamBeats").get();
      fbs.forEach((sticking) => {
        const newItem = { ...sticking.data(), id: sticking.id };
        fbArr.push(newItem);
      });
      const stickings = {
        sbcs: sbcArr,
        fbs: fbArr,
      };
      dispatch(getStickings(stickings));
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Header />
      {!Object.keys(pattern).length ? null : (
        <>
          <StickControlExercise sticking={pattern} />
          {/* <Shapes /> */}
        </>
      )}
      <Controls />
      <Register />
      <Login />
    </div>
  );
}

export default App;
