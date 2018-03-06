import React from "react";
import { render } from "react-dom";
import TrafficLights from "./traffic-lights";
import Pedestrian from "./pedestrian";
import "./style.css";
import Microstates from "@microstates/react";
import Interval from "react-interval";

import { Intersection } from './models';

let initial = {
  pedestrian: { name: 'Taras', activity: 'standing' },
  light: { color: 'red', timer: 5 }
}

function App() {
  return (
    <Microstates type={Intersection} value={initial} onChange={value => console.log(value)}>
    {intersection => {
      return (
        <div>
          <Interval timeout={1000} enabled={true} callback={intersection.tick}/>
          <TrafficLights light={intersection.state.light} />
          <Pedestrian pedestrian={intersection.state.pedestrian} />
        </div>
      );
    }}
  </Microstates>
  );
}

render(<App />, document.getElementById("root"));
