import React from "react";
import "./StickControlExercise.scss";
import Sticking from "../Sticking";
import { ReactComponent as Notation } from "../../SVGs/eighth-notes.svg";
import { ReactComponent as Flams } from "../../SVGs/stick-control/flams.svg";
import { ReactComponent as FlamsMixed } from "../../SVGs/stick-control/flams-mixed-sixteenths.svg";
import { ReactComponent as FlamsMixedTaps } from "../../SVGs/stick-control/flams-mixed-taps.svg";
import { ReactComponent as FlamsSixteenths } from "../../SVGs/stick-control/flams-sixteenths.svg";
import { ReactComponent as FlamsSixteenthsTaps } from "../../SVGs/stick-control/flams-sixteenths-taps.svg";
import { ReactComponent as EighthNotes } from "../../SVGs/stick-control/eighth-notes.svg";
import { ReactComponent as EighthNotesFlams } from "../../SVGs/stick-control/eighth-notes-flams.svg";
import { ReactComponent as Blank } from "../../SVGs/blank.svg";

const StickControlExercise = ({ sticking }) => {
  return (
    <div className="container">
      <div className="exercise">
        <div className="exercise-info">
          <p className="exercise__number">No. {sticking.exercise}</p>
          {sticking.inverted ? <p>Inverted</p> : null}
        </div>
        <div className={`exercise-item exercise-item--${sticking.class}`}>
          {(() => {
            switch (sticking.count) {
              case "1+2+3+4+|1+2+3+4+":
                return <EighthNotes />;
              case "F+aF+a|F+aF+a":
                return <Flams />;
              case "Fe+aFe+a|Fe+aFe+a":
                return <FlamsSixteenths />;
              case "FeFaFeFa|FeFaFeFa":
                return <FlamsSixteenthsTaps />;
              case "F+aF+a|Fe+aFe+a":
                return <FlamsMixed />;
              case "F+aF+a|FeFaFeFa":
                return <FlamsMixedTaps />;

              default:
                return null;
            }
          })()}
          <Sticking sticking={sticking} />
          {/* <Blank />
          <EighthNotes />
          <Sticking sticking={sticking} />
          <Notation />
          <EighthNotesFlams />
          <Flams />
          <FlamsMixed />
          <FlamsSixteenths />
          <FlamsSixteenthsTaps /> */}
        </div>
      </div>
    </div>
  );
};

export default StickControlExercise;
