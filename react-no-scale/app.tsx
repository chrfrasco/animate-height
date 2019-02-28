import * as React from "react";
import lorem from "lorem-ipsum";
import { MeasuredAnimatedHeight } from "./measured_animated_height";

function randInt(min: number, max: number) {
  return ~~(Math.random() * (max - min)) + min;
}

export const App = () => {
  const [words, setWords] = React.useState(480);
  return (
    <React.Fragment>
      <button onClick={() => setWords(randInt(30, 300))}>
        Update height
      </button>
      <MeasuredAnimatedHeight className="panel">
        <div className="panelContent">{lorem({ count: words, units: 'words' })}</div>
      </MeasuredAnimatedHeight>
    </React.Fragment>
  );
};
