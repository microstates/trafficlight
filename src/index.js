import React from "react";
import { render } from "react-dom";
import Interval from "react-interval";

import Intersection from "./states/intersection";
import TrafficLight from "./components/traffic-light";
import Pedestrian from "./components/pedestrian";

import { Store, create } from "microstates";

import "./style.css";

let initial = {
  pedestrian: { name: "Taras", activity: "standing" },
  light: { color: "red" }
};

class App extends React.Component {
  state = {
    $: Store(create(Intersection, initial), $ => this.setState({ $ }))
  };

  render() {
    let intersection = this.state.$;

    return (
      <div>
        <Interval enabled timeout={1000} callback={intersection.tick} />
        <TrafficLight light={intersection.light} />
        <Pedestrian pedestrian={intersection.pedestrian} />
        <div className="footer">
          timer: {intersection.light.timer.state}
        </div>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
