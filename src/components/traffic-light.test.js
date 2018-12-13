import React from "react";
import { mount } from "@bigtest/react";
import Interactor, { hasClass, property } from "@bigtest/interactor";
import { create } from "microstates";

import State from '../states/traffic-light';
import TrafficLight from './traffic-light';

const TrafficLightInteractor = Interactor.extend(
  class {
    static defaultScope = ".trafficlight";
    isRed = hasClass(".red", "is-active");
    isYellow = hasClass(".yellow", "is-active");
    isGreen = hasClass(".green", "is-active");
  }
);

describe('<TrafficLight />', () => {
  let interactor = new TrafficLightInteractor();

  it('is green', async () => {  
    let light = create(State, { color: 'green' });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isGreen).toBe(true);
  });

  it('is red', async () => {
    let light = create(State, { color: 'red' });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isRed).toBe(true);
  });

  it('is yellow', async () => {
    let light = create(State, { color: 'yellow' });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isYellow).toBe(true);
  });
});