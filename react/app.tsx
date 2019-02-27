import * as React from "react";
import lorem from "lorem-ipsum";
import { AnimatedHeight } from "./animated_height";

function randInt(min: number, max: number) {
  return ~~(Math.random() * (max - min)) + min;
}

const text = lorem({ count: 300, units: "words" });

export const App = () => {
  const [height, setHeight] = React.useState(480);
  return (
    <React.Fragment>
      <button onClick={() => setHeight(randInt(320, 800))}>
        Update height
      </button>
      <AnimatedHeight height={height}>{text}</AnimatedHeight>
    </React.Fragment>
  );
};
