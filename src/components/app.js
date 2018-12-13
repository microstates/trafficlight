import React from 'react';
import { Store, create } from "microstates";

import Intersection from "../states/intersection";

const initial = create(Intersection, {
  pedestrian: { activity: "standing" },
  light: { color: "red", timer: 1 }
});

export default class App extends React.Component {
  defaultProps = {
    initial
  }

  state = {
    $: Store(this.props.initial, $ => this.setState({ $ }))
  };

  render() {
    return <Intersection intersection={this.state.$} />;
  }
}