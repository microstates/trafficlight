import React from 'react';
import { Store, create } from "microstates";

import Intersection from "./intersection";
import IntersectionState from '../states/intersection';

export default class App extends React.Component {
  static defaultProps = {
    initial: create(IntersectionState, {
      light: { color: { type: "Red" }, timer: 1 }
    })
  }

  state = {
    $: Store(this.props.initial, $ => this.setState({ $ }))
  };

  render() {
    return <Intersection intersection={this.state.$} />;
  }
}
