import React from "react";
import { render } from "react-dom";
import TrafficLights from "./traffic-lights";
import Pedestrian from "./pedestrian";
import "./style.css";
import State from "@microstates/react";
import Interval from "react-interval";

import { Intersection } from "./models";

let initial = {
  pedestrian: { name: "Taras", activity: "standing" },
  light: { color: "red", timer: 5 }
};

function App() {
  return (
    <State
      type={Intersection}
      value={initial}
    >
      {intersection => {
        return (
          <div>
            <Interval
              timeout={1000}
              enabled={true}
              callback={() => intersection.tick()}
            />
            <TrafficLights light={intersection.light.state} />
            <Pedestrian pedestrian={intersection.pedestrian.state} />
            <div className="footer">timer: {intersection.light.timer.state}</div>
          </div>
        );
      }}
    </State>
  );
}

render(<App />, document.getElementById("root"));
