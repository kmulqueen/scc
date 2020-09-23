import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  previousExercise,
  nextExercise,
  randomExercise,
  randomSBCExercise,
  randomFlamExercise,
  invertExercise,
  searchExercise,
  changeExercise,
} from "../../redux/actions/stickingsActions";

import "./Controls.scss";

const Controls = () => {
  // Redux State & Dispatch
  const dispatch = useDispatch();
  const section = useSelector((state) => state.stickings.section);
  const pattern = useSelector((state) => state.stickings.pattern);
  const scSBCs = useSelector((state) => state.stickings.singleBeatCombinations);
  const scFBs = useSelector((state) => state.stickings.flamBeats);

  // Component level state
  const [search, setSearch] = useState("");
  const [mixMeasure1Section, setMixMeasure1Section] = useState("Any");
  const [mixMeasure2Section, setMixMeasure2Section] = useState("Any");
  const [mixMeasure1, setMixMeasure1] = useState({
    exercise: 1,
    sticking: "RLRLRLRL",
    grid: "1/8 notes",
    count: "1+2+3+4+",
    lead: "R",
  });
  const [mixMeasure2, setMixMeasure2] = useState({
    exercise: 1,
    sticking: "FLLFLL",
    grid: "1/16 notes",
    count: "F+aF+a",
    lead: "R",
  });
  const [mixMeasureSearch, setMixMeasureSearch] = useState({
    m1: "",
    m2: "",
  });

  // Functions
  const handleSearchInput = (e) => {
    switch (section) {
      case "Single Beat Combinations":
        if (e.target.value > 0 && e.target.value <= scSBCs.length) {
          setSearch(e.target.value);
        }
        break;
      case "Flam Beats":
        if (e.target.value > 0 && e.target.value <= scFBs.length) {
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
        if (search > 0 && search <= scSBCs.length) {
          dispatch(searchExercise(search));
          setSearch("");
        } else {
          return;
        }
        break;
      case "Flam Beats":
        if (search > 0 && search <= scFBs.length) {
          dispatch(searchExercise(search));
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
    switch (e.target.value) {
      case "Single Beat Combinations":
        if (pattern.section !== e.target.value) {
          dispatch(changeExercise(scSBCs[0]));
        }
        break;
      case "Flam Beats":
        if (pattern.section !== e.target.value) {
          dispatch(changeExercise(scFBs[0]));
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

  const handleMixSearchInput = (e) => {
    switch (e.target.name) {
      case "mix-m1-search":
        switch (mixMeasure1Section) {
          case "Single Beat Combinations":
            if (e.target.value > 0 && e.target.value <= scSBCs.length) {
              const newM1 = { ...mixMeasureSearch };
              newM1.m1 = e.target.value;
              setMixMeasureSearch(newM1);
            } else {
              return;
            }

            break;
          case "Flam Beats":
            if (e.target.value > 0 && e.target.value <= scFBs.length) {
              const newM1 = { ...mixMeasureSearch };
              newM1.m1 = e.target.value;
              setMixMeasureSearch(newM1);
            } else {
              return;
            }
            break;

          default:
            break;
        }
        break;
      case "mix-m2-search":
        switch (mixMeasure2Section) {
          case "Single Beat Combinations":
            if (e.target.value > 0 && e.target.value <= scSBCs.length) {
              const newM2 = { ...mixMeasureSearch };
              newM2.m2 = e.target.value;
              setMixMeasureSearch(newM2);
            } else {
              return;
            }
            break;
          case "Flam Beats":
            if (e.target.value > 0 && e.target.value <= scFBs.length) {
              const newM2 = { ...mixMeasureSearch };
              newM2.m2 = e.target.value;
              setMixMeasureSearch(newM2);
            } else {
              return;
            }
            break;

          default:
            break;
        }
        break;
      default:
        break;
    }
  };
  const handleMixSearchClick = (e) => {
    e.preventDefault();
    if (mixMeasure1Section === "Any" && mixMeasure2Section === "Any") {
      const clearSearch = { ...mixMeasureSearch };
      clearSearch.m1 = "";
      clearSearch.m2 = "";
      setMixMeasureSearch(clearSearch);
      return;
    }

    const newPattern = {
      section: "Mix Exercise",
      inverted: false,
    };

    switch (mixMeasure1Section) {
      case "Single Beat Combinations":
        if (mixMeasureSearch.m1 === "") {
          const randomIndex = Math.floor(Math.random() * scSBCs.length);
          const m1 = scSBCs[randomIndex - 1].measure1;

          setMixMeasure1(m1);
          newPattern.measure1 = m1;
        } else {
          const newM1 = scSBCs[mixMeasureSearch.m1 - 1].measure1;
          setMixMeasure1(newM1);
          newPattern.measure1 = newM1;
        }
        break;
      case "Flam Beats":
        if (mixMeasureSearch.m1 === "") {
          const randomIndex = Math.floor(Math.random() * scFBs.length);
          const m1 = scFBs[randomIndex - 1].measure1;
          setMixMeasure1(m1);
          newPattern.measure1 = m1;
        } else {
          const newM1 = scFBs[mixMeasureSearch.m1 - 1].measure1;
          setMixMeasure1(newM1);
          newPattern.measure1 = newM1;
        }
        break;
      case "Any":
        const allStickings = [...scSBCs, ...scFBs];
        const randomIndex = Math.floor(Math.random() * allStickings.length);
        const m1 = allStickings[randomIndex - 1].measure1;
        setMixMeasure1(m1);
        newPattern.measure1 = m1;
        break;
    }

    switch (mixMeasure2Section) {
      case "Single Beat Combinations":
        if (mixMeasureSearch.m2 === "") {
          const randomIndex = Math.floor(Math.random() * scSBCs.length);
          const m2 = scSBCs[randomIndex - 1].measure2;
          setMixMeasure2(m2);
          newPattern.measure2 = m2;
        } else {
          const newM2 = scSBCs[mixMeasureSearch.m2 - 1].measure2;
          setMixMeasure2(newM2);
          newPattern.measure2 = newM2;
        }
        break;
      case "Flam Beats":
        if (mixMeasureSearch.m2 === "") {
          const randomIndex = Math.floor(Math.random() * scFBs.length);
          const m2 = scFBs[randomIndex - 1].measure2;
          setMixMeasure2(m2);
          newPattern.measure2 = m2;
        } else {
          const newM2 = scFBs[mixMeasureSearch.m2 - 1].measure2;
          setMixMeasure2(newM2);
          newPattern.measure2 = newM2;
        }
        break;
      case "Any":
        const allStickings = [...scSBCs, ...scFBs];
        const randomIndex = Math.floor(Math.random() * allStickings.length);
        const m2 = allStickings[randomIndex - 1].measure2;
        setMixMeasure2(m2);
        newPattern.measure2 = m2;
        break;
      default:
        break;
    }

    const sticking = `${newPattern.measure1.sticking}${newPattern.measure2.sticking}`;
    const count = `${newPattern.measure1.count}|${newPattern.measure2.count}`;
    newPattern.sticking = sticking;
    newPattern.count = count;
    switch (count) {
      // 4/4 Time
      case "1+2+3+4+|1+2+3+4+":
        newPattern.class = "sc-sbc";
        break;
      case "1+2+3+4+|F+aF+aF+aF+a":
        newPattern.class = "sc-mix-sbc-flams-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFe+aFe+a":
        newPattern.class = "sc-mix-sbc-flams-16s-4-4";
        break;
      case "1+2+3+4+|F+aF+aFeFaFeFa":
        newPattern.class = "sc-mix-sbc-flams-flams-taps-16s-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFeFaFeFa":
        newPattern.class = "sc-mix-sbc-flams-16s-flams-taps-16s-4-4";
        break;
      // 2/4 Time
      case "F+aF+a|F+aF+a":
        newPattern.class = "sc-flams";
        break;
      case "F+aF+a|Fe+aFe+a":
        newPattern.class = "sc-flams-mix";
        break;
      case "F+aF+a|FeFaFeFa":
        newPattern.class = "sc-flams-mix-taps";
        break;
      case "Fe+aFe+a|F+aF+a":
        newPattern.class = "sc-mix-flams-16s-flams-2";
        break;
      case "Fe+aFe+a|Fe+aFe+a":
        newPattern.class = "sc-flams-16s";
        break;
      case "Fe+aFe+a|FeFaFeFa":
        newPattern.class = "sc-mix-flams-16s-flams-taps-16s-2";
        break;
      case "FeFaFeFa|F+aF+a":
        newPattern.class = "sc-mix-flams-taps-16s-flams-2";
        break;
      case "FeFaFeFa|Fe+aFe+a":
        newPattern.class = "sc-flams-taps-16s-flams-16s";
        break;
      case "FeFaFeFa|FeFaFeFa":
        newPattern.class = "sc-flams-taps-16s";
        break;
      // 4/4 + 2/4
      case "1+2+3+4+|F+aF+a":
        newPattern.class = "sc-mix-sbc-flams-4-2";
        break;
      case "1+2+3+4+|Fe+aFe+a":
        newPattern.class = "sc-mix-sbc-flams-16s-4-2";
        break;
      case "1+2+3+4+|FeFaFeFa":
        newPattern.class = "sc-mix-sbc-flams-taps-16s-4-2";
        break;
      case "F+aF+aF+aF+a|F+aF+a":
        newPattern.class = "sc-mix-flams-flams-4-2";
        break;
      case "F+aF+aF+aF+a|Fe+aFe+a":
        newPattern.class = "sc-mix-flams-flams-16s-4-2";
        break;
      case "F+aF+aF+aF+a|FeFaFeFa":
        newPattern.class = "sc-mix-flams-flams-taps-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|F+aF+a":
        newPattern.class = "sc-mix-flams-16s-flams-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|Fe+aFe+a":
        newPattern.class = "sc-mix-flams-16s-flams-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|FeFaFeFa":
        newPattern.class = "sc-mix-flams-16s-flams-taps-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|F+aF+a":
        newPattern.class = "sc-mix-flams-taps-16s-flams-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|Fe+aFe+a":
        newPattern.class = "sc-mix-flams-taps-16s-flams-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|FeFaFeFa":
        newPattern.class = "sc-mix-flams-taps-16s-flams-taps-16s-4-2";
        break;
      // 2/4 + 4/4
      case "F+aF+a|1+2+3+4+":
        newPattern.class = "sc-mix-flams-sbc-2-4";
        break;
      case "F+aF+a|F+aF+aF+aF+a":
        newPattern.class = "sc-mix-flams-flams-2-4";
        break;
      case "F+aF+a|Fe+aFe+aFe+aFe+a":
        newPattern.class = "sc-mix-flams-flams-16s-2-4";
        break;
      case "F+aF+a|FeFaFeFaFeFaFeFa":
        newPattern.class = "sc-mix-flams-flams-taps-16s-2-4";
        break;
      case "Fe+aFe+a|1+2+3+4+":
        newPattern.class = "sc-mix-flams-16s-sbc-2-4";
        break;
      case "Fe+aFe+a|F+aF+aF+aF+a":
        newPattern.class = "sc-mix-flams-16s-flams-2-4";
        break;
      case "Fe+aFe+a|Fe+aFe+aFe+aFe+a":
        newPattern.class = "sc-mix-flams-16s-flams-16s-2-4";
        break;
      case "Fe+aFe+a|FeFaFeFaFeFaFeFa":
        newPattern.class = "sc-mix-flams-16s-flams-taps-16s-2-4";
        break;
      case "FeFaFeFa|1+2+3+4+":
        newPattern.class = "sc-mix-flams-taps-16s-sbc-2-4";
        break;
      case "FeFaFeFa|F+aF+aF+aF+a":
        newPattern.class = "sc-mix-flams-taps-16s-flams-2-4";
        break;
      case "FeFaFeFa|Fe+aFe+aFe+aFe+a":
        newPattern.class = "sc-mix-flams-taps-16s-flams-16s-2-4";
        break;
      case "FeFaFeFa|FeFaFeFaFeFaFeFa":
        newPattern.class = "sc-mix-flams-taps-16s-flams-taps-16s-2-4";
        break;
    }

    dispatch(changeExercise(newPattern));
  };
  const mixExerciseMeasure1 = () => {
    const m1Selection = mixMeasure1Section;
    const allExercises = [...scSBCs, ...scFBs];
    const sbcExercises = scSBCs;
    const flamExercises = scFBs;
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
    const allExercises = [...scSBCs, ...scFBs];
    const sbcExercises = scSBCs;
    const flamExercises = scFBs;
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
    dispatch(changeExercise(newExercise));
  };

  return (
    <div className="controls-container">
      {/* Basics */}
      {/* Start Exercise */}

      {/* Previous / Next */}
      <div className="controls-prev-next">
        <button
          onClick={useCallback(() => dispatch(previousExercise()), [dispatch])}
          name="previous"
        >
          Previous Exercise
        </button>
        <div className="controls-exercise-number-input-container">
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
        </div>
        <div className="controls-exercise-section-input-container">
          <label htmlFor="filter">Section:</label>
          <select name="filter" value={section} onChange={handleSectionSelect}>
            <option value="Single Beat Combinations">
              Single Beat Combinations
            </option>
            <option value="Flam Beats">Flam Beats</option>
          </select>
        </div>
        <button
          onClick={useCallback(() => dispatch(invertExercise()), [dispatch])}
        >
          Invert Exercise
        </button>
        <button
          onClick={useCallback(() => dispatch(nextExercise()), [dispatch])}
          name="next"
        >
          Next Exercise
        </button>
      </div>

      {/* Random Exercises */}
      <div className="controls-random-exercises-container">
        <h2 className="controls__title">Randomize Exercise</h2>
        <button
          onClick={useCallback(() => dispatch(randomExercise()), [dispatch])}
        >
          Random Exercise
        </button>
        <button
          onClick={useCallback(() => dispatch(randomSBCExercise()), [dispatch])}
        >
          Random SBC Exercise
        </button>
        <button
          onClick={useCallback(() => dispatch(randomFlamExercise()), [
            dispatch,
          ])}
        >
          Random Flam Exercise
        </button>
        <button onClick={mixExercise}>Random Mix Exercise</button>
      </div>
      {/* Mix Exercises */}
      <div className="controls-mix-sections-container">
        <form className="controls-mix-sections-form">
          <h2 className="controls__title">Mix Sections</h2>

          {/* Sort Exercises by Section */}
          <div className="controls-mix-m1-section">
            <label htmlFor="mix-measure-1">Measure 1 Section:</label>
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
          </div>
          <div className="controls-mix-m2-section">
            <label htmlFor="mix-measure-2">Measure 2 Section:</label>
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
          </div>

          <div className="controls-mix-m1-exercise">
            <label htmlFor="search">Measure 1 Exercise # </label>
            <input
              type="number"
              onChange={handleMixSearchInput}
              name="mix-m1-search"
              value={mixMeasureSearch.m1}
              placeholder="Measure 1 Exercise #"
            />
          </div>
          <div className="controls-mix-m2-exercise">
            <label htmlFor="search">Measure 2 Exercise # </label>
            <input
              type="number"
              onChange={handleMixSearchInput}
              name="mix-m2-search"
              value={mixMeasureSearch.m2}
              placeholder="Measure 2 Exercise #"
            />
          </div>
          <button
            className="controls__btn controls__btn--apply-mix"
            type="submit"
            onClick={handleMixSearchClick}
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Controls;
