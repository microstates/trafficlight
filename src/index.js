import React from "react";
import { render } from "react-dom";
import Interval from "react-interval";

import Intersection from "./states/intersection";
import TrafficLight from "./components/traffic-light";
import Pedestrian from "./components/pedestrian";

import { Store, create, valueOf } from "microstates";

import "./style.css";

let initial = {
  pedestrian: { name: "Taras", activity: "standing" },
  light: { color: "red", timer: 3 }
};

class App extends React.Component {
  state = {
    $: Store(create(Intersection, initial), $ => this.setState({ $ }))
  };

  render() {
    let intersection = this.state.$;

    return (
      <>
        <Interval enabled timeout={1000} callback={intersection.tick} />
        <main>
          <TrafficLight light={intersection.light} />
          <Pedestrian pedestrian={intersection.pedestrian} />
        </main>
        <footer>Value: {JSON.stringify(valueOf(intersection), undefined, 2)}</footer>{" "}
      </>
    );
  }
}
render(<App />, document.getElementById("root"));
