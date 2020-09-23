import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import {
  getStickings,
  startExercise,
} from "../../redux/actions/stickingsActions";
import "./StickControlExercise.scss";
import Sticking from "../Sticking";
import Controls from "../Controls";
import { ReactComponent as Notation } from "../../SVGs/eighth-notes.svg";
import { ReactComponent as Flams } from "../../SVGs/stick-control/flams.svg";
import { ReactComponent as FlamsMixed } from "../../SVGs/stick-control/flams-mixed-sixteenths.svg";
import { ReactComponent as FlamsMixedTaps } from "../../SVGs/stick-control/flams-mixed-taps.svg";
import { ReactComponent as FlamsSixteenths } from "../../SVGs/stick-control/flams-sixteenths.svg";
import { ReactComponent as FlamsSixteenthsTaps } from "../../SVGs/stick-control/flams-sixteenths-taps.svg";
import { ReactComponent as Flams16sFlamsTaps16s } from "../../SVGs/stick-control/flams-16s-flams-taps-16s-2.svg";
import { ReactComponent as FlamsTaps16sFlams16s } from "../../SVGs/stick-control/flams-taps-16s-flams-16s-2.svg";
import { ReactComponent as EighthNotes } from "../../SVGs/stick-control/eighth-notes.svg";
import { ReactComponent as MixFlams16sFlams2 } from "../../SVGs/stick-control/mixes/2/mix-flams-16s-flams-2.svg";
import { ReactComponent as MixFlamsTaps16sFlams2 } from "../../SVGs/stick-control/mixes/2/mix-flams-taps-16s-flams-2.svg";
import { ReactComponent as MixSBCFlams4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams.svg";
import { ReactComponent as MixSBCFlams16s4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams-16s-4.svg";
import { ReactComponent as MixSBCFlamsFlamsTaps16s4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams-flams-taps-16s-4.svg";
import { ReactComponent as MixSBCFlams16sFlamsTaps16s4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams-16s-flams-taps-16s-4.svg";
import { ReactComponent as MixSBCFlamsFlams16s4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams-flams-16s-4.svg";
import { ReactComponent as MixSBCFlamsTaps16sFlams16s4 } from "../../SVGs/stick-control/mixes/4/mix-sbc-flams-taps-16s-flams-16s-4.svg";
import { ReactComponent as MixSBCFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-sbc-flams-4-2.svg";
import { ReactComponent as MixSBCFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-sbc-flams-16s-4-2.svg";
import { ReactComponent as MixSBCFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-sbc-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-4-2.svg";
import { ReactComponent as MixFlamsFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-16s-4-2.svg";
import { ReactComponent as MixFlamsFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsFlams16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-16s-flams-4-2.svg";
import { ReactComponent as MixFlamsFlams16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlamsFlams16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsFlamsTaps16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-taps-16s-flams-4-2.svg";
import { ReactComponent as MixFlamsFlamsTaps16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-taps-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlamsFlamsTaps16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-flams-taps-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlams16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-4-2.svg";
import { ReactComponent as MixFlams16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlams16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlams16sFlamsTaps16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-taps-16s-flams-4-2.svg";
import { ReactComponent as MixFlams16sFlamsTaps16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-taps-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlams16sFlamsTaps16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-16s-flams-taps-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlams16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-16s-flams-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlams16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlams16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlamsTaps16sFlams42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-taps-16s-flams-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlamsTaps16sFlams16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-taps-16s-flams-16s-4-2.svg";
import { ReactComponent as MixFlamsTaps16sFlamsTaps16sFlamsTaps16s42 } from "../../SVGs/stick-control/mixes/4-2/mix-flams-taps-16s-flams-taps-16s-flams-taps-16s-4-2.svg";
import { ReactComponent as MixFlamsSBC24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-sbc-2-4.svg";
import { ReactComponent as MixFlamsFlams24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-2-4.svg";
import { ReactComponent as MixFlamsFlamsFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsFlamsFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlamsFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsFlams16sFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-16s-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlamsFlamsTaps16sFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-taps-16s-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlams16sSBC24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-sbc-2-4.svg";
import { ReactComponent as MixFlams16sFlams24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-2-4.svg";
import { ReactComponent as MixFlams16sFlamsFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-flams-16s-2-4.svg";
import { ReactComponent as MixFlams16sFlamsFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-2-4.svg";
import { ReactComponent as MixFlams16sFlams16sFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-16s-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlams16sFlamsTaps16sFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-taps-16s-flams-16s-2-4.svg";
import { ReactComponent as MixFlams16sFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-16s-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sSBC24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-sbc-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlams24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlamsFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlamsFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlams16sFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-16s-flams-taps-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlamsTaps16sFlams16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-taps-16s-flams-16s-2-4.svg";
import { ReactComponent as MixFlamsTaps16sFlamsTaps16sFlamsTaps16s24 } from "../../SVGs/stick-control/mixes/2-4/mix-flams-taps-16s-flams-taps-16s-flams-taps-16s-2-4.svg";
import { ReactComponent as EighthNotesFlams } from "../../SVGs/stick-control/eighth-notes-flams.svg";
import { ReactComponent as Blank } from "../../SVGs/blank.svg";

const StickControlExercise = () => {
  const dispatch = useDispatch();
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
  const sticking = useSelector((state) => state.stickings.pattern);
  return (
    <div className="container exercise-container">
      {!Object.keys(sticking).length ? (
        <button onClick={() => dispatch(startExercise())}>
          Start Exercises
        </button>
      ) : (
        <div className="exercise">
          <div className="exercise-info">
            {sticking.section !== "Mix Exercise" ? (
              <p className="exercise__number">No. {sticking.exercise}</p>
            ) : (
              <p className="exercise__number">
                Mix No. {sticking.measure1.exercise} and{" "}
                {sticking.measure2.exercise}
              </p>
            )}
            {sticking.inverted ? <p>Inverted</p> : null}
          </div>
          <div className={`exercise-item exercise-item--${sticking.class}`}>
            {(() => {
              switch (sticking.count) {
                // Base Exercises
                case "1+2+3+4+|1+2+3+4+":
                  return <EighthNotes />;
                case "F+aF+a|F+aF+a":
                  return <Flams />;
                case "Fe+aFe+a|Fe+aFe+a":
                  return <FlamsSixteenths />;
                case "Fe+aFe+a|FeFaFeFa":
                  return <Flams16sFlamsTaps16s />;
                case "FeFaFeFa|Fe+aFe+a":
                  return <FlamsTaps16sFlams16s />;
                case "FeFaFeFa|FeFaFeFa":
                  return <FlamsSixteenthsTaps />;
                case "F+aF+a|Fe+aFe+a":
                  return <FlamsMixed />;
                case "F+aF+a|FeFaFeFa":
                  return <FlamsMixedTaps />;

                // === MIXES ===
                // 2/4 Time (1 Flam)
                case "Fe+aFe+a|F+aF+a":
                  return <MixFlams16sFlams2 />;
                case "FeFaFeFa|F+aF+a":
                  return <MixFlamsTaps16sFlams2 />;

                // 4/4 (1 SBC + 1 Flam)
                case "1+2+3+4+|F+aF+aF+aF+a":
                  return <MixSBCFlams4 />;
                case "1+2+3+4+|F+aF+aFe+aFe+a":
                  return <MixSBCFlamsFlams16s4 />;
                case "1+2+3+4+|F+aF+aFeFaFeFa":
                  return <MixSBCFlamsFlamsTaps16s4 />;
                case "1+2+3+4+|Fe+aFe+aFe+aFe+a":
                  return <MixSBCFlams16s4 />;
                case "1+2+3+4+|Fe+aFe+aFeFaFeFa":
                  return <MixSBCFlams16sFlamsTaps16s4 />;
                case "1+2+3+4+|FeFaFeFaFe+aFe+a":
                  return <MixSBCFlamsTaps16sFlams16s4 />;

                // 4/4 + 2/4 (1 SBC + 1 Flam Measure)
                case "1+2+3+4+|F+aF+a":
                  return <MixSBCFlams42 />;
                case "1+2+3+4+|Fe+aFe+a":
                  return <MixSBCFlams16s42 />;
                case "1+2+3+4+|FeFaFeFa":
                  return <MixSBCFlamsTaps16s42 />;

                // (1 Flam + 1 Flam Measure)
                case "F+aF+aF+aF+a|F+aF+a":
                  return <MixFlamsFlams42 />;
                case "F+aF+aF+aF+a|Fe+aFe+a":
                  return <MixFlamsFlams16s42 />;
                case "F+aF+aF+aF+a|FeFaFeFa":
                  return <MixFlamsFlamsTaps16s42 />;
                case "F+aF+aFe+aFe+a|F+aF+a":
                  return <MixFlamsFlams16sFlams42 />;
                case "F+aF+aFe+aFe+a|Fe+aFe+a":
                  return <MixFlamsFlams16sFlams16s42 />;
                case "F+aF+aFe+aFe+a|FeFaFeFa":
                  return <MixFlamsFlams16sFlamsTaps16s42 />;
                case "F+aF+aFeFaFeFa|F+aF+a":
                  return <MixFlamsFlamsTaps16sFlams42 />;
                case "F+aF+aFeFaFeFa|Fe+aFe+a":
                  return <MixFlamsFlamsTaps16sFlams16s42 />;
                case "F+aF+aFeFaFeFa|FeFaFeFa":
                  return <MixFlamsFlamsTaps16sFlamsTaps16s42 />;
                case "Fe+aFe+aFe+aFe+a|F+aF+a":
                  return <MixFlams16sFlams42 />;
                case "Fe+aFe+aFe+aFe+a|Fe+aFe+a":
                  return <MixFlams16sFlams16s42 />;
                case "Fe+aFe+aFe+aFe+a|FeFaFeFa":
                  return <MixFlams16sFlamsTaps16s42 />;
                case "Fe+aFe+aFeFaFeFa|F+aF+a":
                  return <MixFlams16sFlamsTaps16sFlams42 />;
                case "Fe+aFe+aFeFaFeFa|Fe+aFe+a":
                  return <MixFlams16sFlamsTaps16sFlams16s42 />;
                case "Fe+aFe+aFeFaFeFa|FeFaFeFa":
                  return <MixFlams16sFlamsTaps16sFlamsTaps16s42 />;
                case "FeFaFeFaFe+aFe+a|F+aF+a":
                  return <MixFlamsTaps16sFlams16sFlams42 />;
                case "FeFaFeFaFe+aFe+a|Fe+aFe+a":
                  return <MixFlamsTaps16sFlams16sFlams16s42 />;
                case "FeFaFeFaFe+aFe+a|FeFaFeFa":
                  return <MixFlamsTaps16sFlams16sFlamsTaps16s42 />;
                case "FeFaFeFaFeFaFeFa|F+aF+a":
                  return <MixFlamsTaps16sFlamsTaps16sFlams42 />;
                case "FeFaFeFaFeFaFeFa|Fe+aFe+a":
                  return <MixFlamsTaps16sFlamsTaps16sFlams16s42 />;
                case "FeFaFeFaFeFaFeFa|FeFaFeFa":
                  return <MixFlamsTaps16sFlamsTaps16sFlamsTaps16s42 />;

                // 2/4 + 4/4 (1 Flam Measure + 1 SBC / Flam)
                case "F+aF+a|1+2+3+4+":
                  return <MixFlamsSBC24 />;
                case "F+aF+a|F+aF+aF+aF+a":
                  return <MixFlamsFlams24 />;
                case "F+aF+a|F+aF+aFe+aFe+a":
                  return <MixFlamsFlamsFlams16s24 />;
                case "F+aF+a|F+aF+aFeFaFeFa":
                  return <MixFlamsFlamsFlamsTaps16s24 />;
                case "F+aF+a|Fe+aFe+aFe+aFe+a":
                  return <MixFlamsFlams16s24 />;
                case "F+aF+a|Fe+aFe+aFeFaFeFa":
                  return <MixFlamsFlams16sFlamsTaps16s24 />;
                case "F+aF+a|FeFaFeFaFe+aFe+a":
                  return <MixFlamsFlamsTaps16sFlams16s24 />;
                case "F+aF+a|FeFaFeFaFeFaFeFa":
                  return <MixFlamsFlamsTaps16s24 />;
                case "Fe+aFe+a|1+2+3+4+":
                  return <MixFlams16sSBC24 />;
                case "Fe+aFe+a|F+aF+aF+aF+a":
                  return <MixFlams16sFlams24 />;
                case "Fe+aFe+a|F+aF+aFe+aFe+a":
                  return <MixFlams16sFlamsFlams16s24 />;
                case "Fe+aFe+a|F+aF+aFeFaFeFa":
                  return <MixFlams16sFlamsFlamsTaps16s24 />;
                case "Fe+aFe+a|Fe+aFe+aFe+aFe+a":
                  return <MixFlams16s24 />;
                case "Fe+aFe+a|Fe+aFe+aFeFaFeFa":
                  return <MixFlams16sFlams16sFlamsTaps16s24 />;
                case "Fe+aFe+a|FeFaFeFaFe+aFe+a":
                  return <MixFlams16sFlamsTaps16sFlams16s24 />;
                case "Fe+aFe+a|FeFaFeFaFeFaFeFa":
                  return <MixFlams16sFlamsTaps16s24 />;
                case "FeFaFeFa|1+2+3+4+":
                  return <MixFlamsTaps16sSBC24 />;
                case "FeFaFeFa|F+aF+aF+aF+a":
                  return <MixFlamsTaps16sFlams24 />;
                case "FeFaFeFa|F+aF+aFe+aFe+a":
                  return <MixFlamsTaps16sFlamsFlams16s24 />;
                case "FeFaFeFa|F+aF+aFeFaFeFa":
                  return <MixFlamsTaps16sFlamsFlamsTaps16s24 />;
                case "FeFaFeFa|Fe+aFe+aFe+aFe+a":
                  return <MixFlamsTaps16sFlams16s24 />;
                case "FeFaFeFa|Fe+aFe+aFeFaFeFa":
                  return <MixFlamsTaps16sFlams16sFlamsTaps16s24 />;
                case "FeFaFeFa|FeFaFeFaFe+aFe+a":
                  return <MixFlamsTaps16sFlamsTaps16sFlams16s24 />;
                case "FeFaFeFa|FeFaFeFaFeFaFeFa":
                  return <MixFlamsTaps16sFlamsTaps16sFlamsTaps16s24 />;

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
      )}
      <Controls />
    </div>
  );
};

export default StickControlExercise;
