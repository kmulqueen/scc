import React from "react";
import shapes from "../../shapes.json";

const Shapes = () => {
  const invert = (str) => {
    const arr = str.split("");

    arr.map((letter, i) => {
      if (letter === "R") {
        arr[i] = "L";
      } else if (letter === "L") {
        arr[i] = "R";
      }
    });

    const inverted = arr.join("");
    // console.log(inverted);
  };
  return (
    <div className="shapes">
      {shapes.map((shape) => invert(shape.sticking))}
    </div>
  );
};

export default Shapes;
