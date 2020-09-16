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
  const [mixMeasure1, setMixMeasure1] = useState({
    sticking: "RLRLRLRL",
    grid: "1/8 notes",
    count: "1+2+3+4+",
    lead: "R",
  });
  const [mixMeasure2, setMixMeasure2] = useState({
    sticking: "FRRRCLLL",
    grid: "1/16 notes",
    count: "Fe+aFe+a",
    lead: "R",
  });
  const [mixMeasure1Section, setMixMeasure1Section] = useState("Any");
  const [mixMeasure2Section, setMixMeasure2Section] = useState("Any");

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
    if (pattern.section === "Mix Exercise") {
      return;
    } else {
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
      // Base Patterns
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
      case "Fe+aFe+a|FeFaFeFa":
        measure1Inverted = currentPattern.sticking.slice(
          0,
          sticking.length / 2
        );

        break;
      case "FeFaFeFa|Fe+aFe+a":
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

      // Mixes
      // 2/4
      case "Fe+aFe+a|F+aF+a":
        console.log(currentPattern.sticking.slice(0, 9));
      case "FeFaFeFa|F+aF+a":
        console.log(currentPattern.sticking.slice(9, 15));

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
  const handleMixSectionSelect = (e) => {
    switch (e.target.name) {
      case "mix-measure-1":
        setMixMeasure1Section(e.target.value);
        break;
      case "mix-measure-2":
        setMixMeasure2Section(e.target.value);
        break;

      default:
        break;
    }
  };

  const mixExerciseMeasure1 = () => {
    const m1Selection = mixMeasure1Section;
    const allExercises = [...stickings[0], ...stickings[1]];
    const sbcExercises = stickings[0];
    const flamExercises = stickings[1];
    if (m1Selection === "Any") {
      const idx = Math.floor(Math.random() * allExercises.length);
      const measure = allExercises[idx].measure1;
      setMixMeasure1(measure);
      return mixMeasure1;
    }
    if (m1Selection === "Single Beat Combinations") {
      const idx = Math.floor(Math.random() * sbcExercises.length);
      const measure = sbcExercises[idx].measure1;
      setMixMeasure1(measure);
      return mixMeasure1;
    }
    if (m1Selection === "Flam Beats") {
      const idx = Math.floor(Math.random() * flamExercises.length);
      const measure = flamExercises[idx].measure1;
      setMixMeasure1(measure);
      return mixMeasure1;
    }
  };
  const mixExerciseMeasure2 = () => {
    const allExercises = [...stickings[0], ...stickings[1]];
    const sbcExercises = stickings[0];
    const flamExercises = stickings[1];
    const m2Selection = mixMeasure2Section;
    if (m2Selection === "Any") {
      const idx = Math.floor(Math.random() * allExercises.length);
      const measure = allExercises[idx].measure2;
      setMixMeasure2(measure);
      return mixMeasure2;
    }
    if (m2Selection === "Single Beat Combinations") {
      const idx = Math.floor(Math.random() * sbcExercises.length);
      const measure = sbcExercises[idx].measure2;
      setMixMeasure2(measure);
      return mixMeasure2;
    }
    if (m2Selection === "Flam Beats") {
      const idx = Math.floor(Math.random() * flamExercises.length);
      const measure = flamExercises[idx].measure2;
      setMixMeasure2(measure);
      return mixMeasure2;
    }
  };
  const mixExercise = (e) => {
    e.preventDefault();
    mixExerciseMeasure1();
    mixExerciseMeasure2();

    const newExercise = {
      section: "Mix Exercise",
      exercise: `Mix ${mixMeasure1Section} and ${mixMeasure2Section}`,
      inverted: false,
    };

    const m1 = { ...mixMeasure1 };
    const m2 = { ...mixMeasure2 };
    const sticking = m1.sticking + m2.sticking;
    newExercise.sticking = sticking;
    newExercise.measure1 = m1;
    newExercise.measure2 = m2;

    const count = m1.count.concat("|", m2.count);
    newExercise.count = count;
    switch (count) {
      // 4/4 Time
      case "1+2+3+4+|1+2+3+4+":
        newExercise.class = "sc-sbc";
        break;
      case "1+2+3+4+|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-sbc-flams-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-sbc-flams-16s-4-4";
        break;
      case "1+2+3+4+|F+aF+aFeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-flams-taps-16s-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-16s-flams-taps-16s-4-4";
        break;
      // 2/4 Time
      case "F+aF+a|F+aF+a":
        newExercise.class = "sc-flams";
        break;
      case "F+aF+a|Fe+aFe+a":
        newExercise.class = "sc-flams-mix";
        break;
      case "F+aF+a|FeFaFeFa":
        newExercise.class = "sc-flams-mix-taps";
        break;
      case "Fe+aFe+a|F+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-2";
        break;
      case "Fe+aFe+a|Fe+aFe+a":
        newExercise.class = "sc-flams-16s";
        break;
      case "Fe+aFe+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-2";
        break;
      case "FeFaFeFa|F+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-2";
        break;
      case "FeFaFeFa|Fe+aFe+a":
        newExercise.class = "sc-flams-taps-16s-flams-16s";
        break;
      case "FeFaFeFa|FeFaFeFa":
        newExercise.class = "sc-flams-taps-16s";
        break;
      // 4/4 + 2/4
      case "1+2+3+4+|F+aF+a":
        newExercise.class = "sc-mix-sbc-flams-4-2";
        break;
      case "1+2+3+4+|Fe+aFe+a":
        newExercise.class = "sc-mix-sbc-flams-16s-4-2";
        break;
      case "1+2+3+4+|FeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-taps-16s-4-2";
        break;
      case "F+aF+aF+aF+a|F+aF+a":
        newExercise.class = "sc-mix-flams-flams-4-2";
        break;
      case "F+aF+aF+aF+a|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-flams-16s-4-2";
        break;
      case "F+aF+aF+aF+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-flams-taps-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|F+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-16s-flams-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|F+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|FeFaFeFa":
        newExercise.class = "sc-mix-flams-taps-16s-flams-taps-16s-4-2";
        break;
      // 2/4 + 4/4
      case "F+aF+a|1+2+3+4+":
        newExercise.class = "sc-mix-flams-sbc-2-4";
        break;
      case "F+aF+a|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-flams-2-4";
        break;
      case "F+aF+a|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-flams-16s-2-4";
        break;
      case "F+aF+a|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-flams-taps-16s-2-4";
        break;
      case "Fe+aFe+a|1+2+3+4+":
        newExercise.class = "sc-mix-flams-16s-sbc-2-4";
        break;
      case "Fe+aFe+a|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-2-4";
        break;
      case "Fe+aFe+a|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-16s-flams-16s-2-4";
        break;
      case "Fe+aFe+a|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-2-4";
        break;
      case "FeFaFeFa|1+2+3+4+":
        newExercise.class = "sc-mix-flams-taps-16s-sbc-2-4";
        break;
      case "FeFaFeFa|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-2-4";
        break;
      case "FeFaFeFa|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-16s-2-4";
        break;
      case "FeFaFeFa|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-taps-16s-flams-taps-16s-2-4";
        break;
    }
    setPattern(newExercise);
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
          <label htmlFor="mix-measure-1">Measure 1 from:</label>
          <select
            name="mix-measure-1"
            value={mixMeasure1Section}
            onChange={handleMixSectionSelect}
          >
            <option value="Any">Any</option>
            <option value="Single Beat Combinations">
              Single Beat Combinations
            </option>
            <option value="Flam Beats">Flam Beats</option>
          </select>
          <label htmlFor="mix-measure-2">Measure 2 from:</label>
          <select
            name="mix-measure-2"
            value={mixMeasure2Section}
            onChange={handleMixSectionSelect}
          >
            <option value="Any">Any</option>
            <option value="Single Beat Combinations">
              Single Beat Combinations
            </option>
            <option value="Flam Beats">Flam Beats</option>
          </select>
          <button onClick={mixExercise}>Mix Exercises</button>
        </form>
      </div>
    </div>
  );
}

export default App;
