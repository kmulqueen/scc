import React, { useState, useEffect } from "react";
import stickings from "./stickings.json";
import db from "./firebase";
import "./App.scss";

import Header from "./components/Header";
import StickControlExercise from "./components/StickControlExercise";
import Shapes from "./components/Shapes";

function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const singleBeatCombinations = await db
  //       .collection("singleBeatCombinations")
  //       .get();
  //     singleBeatCombinations.forEach((sticking) => {
  //       console.log(sticking.id, "==>", sticking.data());
  //     });
  //     const flamBeats = await db.collection("flamBeats").get();
  //     flamBeats.forEach((sticking) => {
  //       console.log(sticking.id, "==>", sticking.data());
  //     });
  //   };
  //   getData();
  // }, []);
  const [pattern, setPattern] = useState({});
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("Single Beat Combinations");
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
  const [mixMeasure1Section, setMixMeasure1Section] = useState("Any");
  const [mixMeasure2Section, setMixMeasure2Section] = useState("Any");
  const [mixMeasureSearch, setMixMeasureSearch] = useState({
    m1: "",
    m2: "",
  });

  const startExercise = () => {
    switch (section) {
      case "Single Beat Combinations":
        setPattern(stickings.singleBeatCombinations[0]);
        break;
      case "Flam Beats":
        setPattern(stickings.flamBeats[0]);
        break;
      default:
        return null;
    }
  };

  const randomExercise = () => {
    const allExercises = [
      ...stickings.singleBeatCombinations,
      ...stickings.flamBeats,
    ];
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    const randomExercise = allExercises[randomIndex];
    setPattern(randomExercise);
    setSection(randomExercise.section);
  };
  const randomSBCExercise = () => {
    const randomIndex = Math.floor(
      Math.random() * stickings.singleBeatCombinations.length
    );
    const randomSticking = stickings.singleBeatCombinations[randomIndex];
    setPattern(randomSticking);
    setSection(randomSticking.section);
  };
  const randomFlamExercise = () => {
    const randomIndex = Math.floor(Math.random() * stickings.flamBeats.length);
    const randomSticking = stickings.flamBeats[randomIndex];
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
                setPattern(
                  stickings.singleBeatCombinations[pattern.exercise - 2]
                );
                setSection(
                  stickings.singleBeatCombinations[pattern.exercise - 2].section
                );
              } else {
                console.log(
                  "This is the 1st exercise, there are no previous exercises."
                );
              }
              break;
            case "Flam Beats":
              if (pattern.exercise !== 1) {
                setPattern(stickings.flamBeats[pattern.exercise - 2]);
                setSection(stickings.flamBeats[pattern.exercise - 2].section);
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
              if (pattern.exercise < stickings.singleBeatCombinations.length) {
                setPattern(stickings.singleBeatCombinations[pattern.exercise]);
                setSection(
                  stickings.singleBeatCombinations[pattern.exercise].section
                );
              }
              break;
            case "Flam Beats":
              if (pattern.exercise < stickings.flamBeats.length) {
                setPattern(stickings.flamBeats[pattern.exercise]);
                setSection(stickings.flamBeats[pattern.exercise].section);
              } else {
                console.log(
                  "This is the last exercise.",
                  stickings.flamBeats.length
                );
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
        measure1Inverted = currentPattern.sticking.slice(0, 8);

      case "FeFaFeFa|F+aF+a":
        measure1Inverted = currentPattern.sticking.slice(0, 8);

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
        if (
          e.target.value > 0 &&
          e.target.value <= stickings.singleBeatCombinations.length
        ) {
          setSearch(e.target.value);
        }
        break;
      case "Flam Beats":
        if (
          e.target.value > 0 &&
          e.target.value <= stickings.flamBeats.length
        ) {
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
        if (search > 0 && search <= stickings.singleBeatCombinations.length) {
          setPattern(stickings.singleBeatCombinations[search - 1]);
          setSearch("");
        } else {
          return;
        }
        break;
      case "Flam Beats":
        if (search > 0 && search <= stickings.flamBeats.length) {
          setPattern(stickings.flamBeats[search - 1]);
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
          setPattern(stickings.singleBeatCombinations[0]);
        }
        break;
      case "Flam Beats":
        if (pattern.section !== e.target.value) {
          setPattern(stickings.flamBeats[0]);
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
            if (
              e.target.value > 0 &&
              e.target.value <= stickings.singleBeatCombinations.length
            ) {
              const newM1 = { ...mixMeasureSearch };
              newM1.m1 = e.target.value;
              setMixMeasureSearch(newM1);
            } else {
              return;
            }

            break;
          case "Flam Beats":
            if (
              e.target.value > 0 &&
              e.target.value <= stickings.flamBeats.length
            ) {
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
            if (
              e.target.value > 0 &&
              e.target.value <= stickings.singleBeatCombinations.length
            ) {
              const newM2 = { ...mixMeasureSearch };
              newM2.m2 = e.target.value;
              setMixMeasureSearch(newM2);
            } else {
              return;
            }
            break;
          case "Flam Beats":
            if (
              e.target.value > 0 &&
              e.target.value <= stickings.flamBeats.length
            ) {
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
          const randomIndex = Math.floor(
            Math.random() * stickings.singleBeatCombinations.length
          );
          const m1 = stickings.singleBeatCombinations[randomIndex - 1].measure1;

          setMixMeasure1(m1);
          newPattern.measure1 = m1;
        } else {
          const newM1 =
            stickings.singleBeatCombinations[mixMeasureSearch.m1 - 1].measure1;
          setMixMeasure1(newM1);
          newPattern.measure1 = newM1;
        }
        break;
      case "Flam Beats":
        if (mixMeasureSearch.m1 === "") {
          const randomIndex = Math.floor(
            Math.random() * stickings.flamBeats.length
          );
          const m1 = stickings.flamBeats[randomIndex - 1].measure1;
          setMixMeasure1(m1);
          newPattern.measure1 = m1;
        } else {
          const newM1 = stickings.flamBeats[mixMeasureSearch.m1 - 1].measure1;
          setMixMeasure1(newM1);
          newPattern.measure1 = newM1;
        }
        break;
      case "Any":
        const allStickings = [
          ...stickings.singleBeatCombinations,
          ...stickings.flamBeats,
        ];
        const randomIndex = Math.floor(Math.random() * allStickings.length);
        const m1 = allStickings[randomIndex - 1].measure1;
        setMixMeasure1(m1);
        newPattern.measure1 = m1;
        break;
    }

    switch (mixMeasure2Section) {
      case "Single Beat Combinations":
        if (mixMeasureSearch.m2 === "") {
          const randomIndex = Math.floor(
            Math.random() * stickings.singleBeatCombinations.length
          );
          const m2 = stickings.singleBeatCombinations[randomIndex - 1].measure2;
          setMixMeasure2(m2);
          newPattern.measure2 = m2;
        } else {
          const newM2 =
            stickings.singleBeatCombinations[mixMeasureSearch.m2 - 1].measure2;
          setMixMeasure2(newM2);
          newPattern.measure2 = newM2;
        }
        break;
      case "Flam Beats":
        if (mixMeasureSearch.m2 === "") {
          const randomIndex = Math.floor(
            Math.random() * stickings.flamBeats.length
          );
          const m2 = stickings.flamBeats[randomIndex - 1].measure2;
          setMixMeasure2(m2);
          newPattern.measure2 = m2;
        } else {
          const newM2 = stickings.flamBeats[mixMeasureSearch.m2 - 1].measure2;
          setMixMeasure2(newM2);
          newPattern.measure2 = newM2;
        }
        break;
      case "Any":
        const allStickings = [
          ...stickings.singleBeatCombinations,
          ...stickings.flamBeats,
        ];
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

    setPattern(newPattern);
  };

  const mixExerciseMeasure1 = () => {
    const m1Selection = mixMeasure1Section;
    const allExercises = [
      ...stickings.singleBeatCombinations,
      ...stickings.flamBeats,
    ];
    const sbcExercises = stickings.singleBeatCombinations;
    const flamExercises = stickings.flamBeats;
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
    const allExercises = [
      ...stickings.singleBeatCombinations,
      ...stickings.flamBeats,
    ];
    const sbcExercises = stickings.singleBeatCombinations;
    const flamExercises = stickings.flamBeats;
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
          {/* <Shapes /> */}
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
          <label htmlFor="search">Measure 1 Exercise # </label>
          <input
            type="number"
            onChange={handleMixSearchInput}
            name="mix-m1-search"
            value={mixMeasureSearch.m1}
            placeholder="Measure 1 Exercise #"
          />
          <label htmlFor="search">Measure 2 Exercise # </label>
          <input
            type="number"
            onChange={handleMixSearchInput}
            name="mix-m2-search"
            value={mixMeasureSearch.m2}
            placeholder="Measure 2 Exercise #"
          />
          <button type="submit" onClick={handleMixSearchClick}>
            Apply
          </button>
          <button onClick={mixExercise}>Mix Exercises</button>
        </form>
      </div>
    </div>
  );
}

export default App;
