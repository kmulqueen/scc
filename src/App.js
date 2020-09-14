import React, { useState } from "react";
import stickings from "./stickings.json";
import "./App.scss";

import Header from "./components/Header";
import StickControlExercise from "./components/StickControlExercise";
import Shapes from "./components/Shapes";

function App() {
  const [pattern, setPattern] = useState({});
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("Single Beat Combinations");

  const startExercise = () => {
    switch (section) {
      case "Single Beat Combinations":
        setPattern(stickings[0][0]);
        break;
      case "Flam Beats":
        setPattern(stickings[1][0]);
        break;
      default:
        return null;
    }
  };

  const randomExercise = () => {
    const allExercises = [...stickings[0], ...stickings[1]];
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    const randomExercise = allExercises[randomIndex];
    setPattern(randomExercise);
    setSection(randomExercise.section);
  };
  const randomSBCExercise = () => {
    const randomIndex = Math.floor(Math.random() * stickings[0].length);
    const randomSticking = stickings[0][randomIndex];
    setPattern(randomSticking);
    setSection(randomSticking.section);
  };
  const randomFlamExercise = () => {
    const randomIndex = Math.floor(Math.random() * stickings[1].length);
    const randomSticking = stickings[1][randomIndex];
    setPattern(randomSticking);
    setSection(randomSticking.section);
  };
  const changeExercise = (e) => {
    switch (e.target.name) {
      case "previous":
        switch (section) {
          case "Single Beat Combinations":
            if (pattern.exercise !== 1) {
              setPattern(stickings[0][pattern.exercise - 2]);
              setSection(stickings[0][pattern.exercise - 2].section);
            } else {
              console.log(
                "This is the 1st exercise, there are no previous exercises."
              );
            }
            break;
          case "Flam Beats":
            if (pattern.exercise !== 1) {
              setPattern(stickings[1][pattern.exercise - 2]);
              setSection(stickings[1][pattern.exercise - 2].section);
            } else {
              console.log(
                "This is the 1st exercise, there are no previous exercises."
              );
            }
            break;

          default:
            return;
        }
        break;
      case "next":
        switch (section) {
          case "Single Beat Combinations":
            if (pattern.exercise < stickings[0].length) {
              setPattern(stickings[0][pattern.exercise]);
              setSection(stickings[0][pattern.exercise].section);
            }
            break;
          case "Flam Beats":
            if (pattern.exercise < stickings[1].length) {
              setPattern(stickings[1][pattern.exercise]);
              setSection(stickings[1][pattern.exercise].section);
            } else {
              console.log("This is the last exercise.", stickings[1].length);
            }
            break;

          default:
            return;
        }
        break;

      default:
        break;
    }
  };
  const invertExercise = () => {
    const sticking = pattern.sticking;
    let stickingArray = sticking.split("");
    for (let [i, letter] of stickingArray.entries()) {
      switch (letter) {
        case "R":
          stickingArray[i] = "L";
          break;
        case "L":
          stickingArray[i] = "R";

          break;
        case "F":
          stickingArray[i] = "C";

          break;
        case "C":
          stickingArray[i] = "F";

          break;

        default:
          break;
      }
    }
    const invertedSticking = stickingArray.join("");
    const currentPattern = { ...pattern };
    currentPattern.sticking = invertedSticking;

    let measure1Inverted;
    switch (currentPattern.count) {
      case "1+2+3+4+|1+2+3+4+":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;
      case "F+aF+a|F+aF+a":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;
      case "F+aF+a|Fe+aFe+a":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2 - 1
        );

        break;
      case "F+aF+a|FeFaFeFa":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2 - 1
        );

        break;
      case "Fe+aFe+a|Fe+aFe+a":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;
      case "Fe+aFe+a|FeFaFeFa":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;
      case "FeFaFeFa|FeFaFeFa":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;

      default:
        break;
    }
    const measure2Inverted = currentPattern.sticking.slice(
      measure1Inverted.length,
      sticking.length
    );
    currentPattern.measure1.sticking = measure1Inverted;
    currentPattern.measure2.sticking = measure2Inverted;
    currentPattern.inverted = !currentPattern.inverted;
    setPattern(currentPattern);
  };
  const handleSearchInput = (e) => {
    switch (section) {
      case "Single Beat Combinations":
        if (e.target.value > 0 && e.target.value <= stickings[0].length) {
          setSearch(e.target.value);
        }
        break;
      case "Flam Beats":
        if (e.target.value > 0 && e.target.value <= stickings[1].length) {
          setSearch(e.target.value);
        }
        break;

      default:
        break;
    }
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    switch (section) {
      case "Single Beat Combinations":
        if (search > 0 && search <= stickings[0].length) {
          setPattern(stickings[0][search - 1]);
          setSearch("");
        } else {
          return;
        }
        break;
      case "Flam Beats":
        if (search > 0 && search <= stickings[1].length) {
          setPattern(stickings[1][search - 1]);
          setSearch("");
        } else {
          return;
        }
        break;

      default:
        break;
    }
  };
  const handleSectionSelect = (e) => {
    setSection(e.target.value);
    switch (e.target.value) {
      case "Single Beat Combinations":
        if (pattern.section !== e.target.value) {
          setPattern(stickings[0][0]);
        }
        break;
      case "Flam Beats":
        if (pattern.section !== e.target.value) {
          setPattern(stickings[1][0]);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <Header />
      {!Object.keys(pattern).length ? null : (
        <>
          <StickControlExercise sticking={pattern} />
          <Shapes />
        </>
      )}
      <div className="container">
        <button onClick={startExercise}>Start Exercises</button>
        <button onClick={randomExercise}>Random Exercise</button>
        <button onClick={randomSBCExercise}>Random SBC Exercise</button>
        <button onClick={randomFlamExercise}>Random Flam Exercise</button>
        <button onClick={changeExercise} name="previous">
          Previous Exercise
        </button>
        <button onClick={changeExercise} name="next">
          Next Exercise
        </button>
        <button onClick={invertExercise}>Invert Exercise</button>
        <form>
          <label htmlFor="search">Exercise # </label>
          <input
            type="number"
            onChange={handleSearchInput}
            name="search"
            value={search}
            placeholder="Find by Exercise #"
          />
          <button type="submit" onClick={handleSearchClick}>
            Find
          </button>
          <label htmlFor="filter">Filter By:</label>
          <select name="filter" value={section} onChange={handleSectionSelect}>
            <option value="Single Beat Combinations">
              Single Beat Combinations
            </option>
            <option value="Flam Beats">Flam Beats</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default App;
