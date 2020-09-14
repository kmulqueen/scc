import React from "react";
import { ReactComponent as LeftFlam } from "../../SVGs/stick-control/left-flam.svg";
import "./Sticking.scss";

const Sticking = ({ sticking }) => {
  return (
    <div className={`sticking sticking--${sticking.class}`}>
      {Object.keys(sticking).length ? (
        <>
          <div className={`measure1 sticking--${sticking.class}`}>
            {sticking.measure1.sticking.split("").map((letter, i) => (
              <div key={i} className={`letter m1n${i + 1}`}>
                {letter === "C" ? <LeftFlam className="left-flam" /> : letter}
              </div>
            ))}
          </div>
          <div className={`measure2 sticking--${sticking.class}`}>
            {sticking.measure2.sticking.split("").map((letter, i) => (
              <div key={i} className={`letter m2n${i + 1}`}>
                {letter === "C" ? <LeftFlam className="left-flam" /> : letter}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Sticking;
