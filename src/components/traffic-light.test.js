import React from "react";
import { mount } from "@bigtest/react";
import Interactor, { hasClass, property } from "@bigtest/interactor";
import { create } from "microstates";

import State from '../states/traffic-light';
import TrafficLight from './traffic-light';

export const TrafficLightInteractor = Interactor.extend(
  class {
    static defaultScope = ".trafficlight";
    isRed = hasClass(".red", "is-active");
    isYellow = hasClass(".yellow", "is-active");
    isGreen = hasClass(".green", "is-active");
    isBlinking = hasClass(".green", 'is-blinking');
  }
);

describe('<TrafficLight />', () => {
  let interactor = new TrafficLightInteractor();

  it('is green', async () => {
    let light = create(State, { color: { type: 'Green' } });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isGreen).toBe(true);
  });

  it('is red', async () => {
    let light = create(State, { color: { type: 'Red' } });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isRed).toBe(true);
  });

  it('is yellow', async () => {
    let light = create(State, { color: {type: 'Yellow' }});
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isYellow).toBe(true);
  });

  it('is green', async () => {
    let light = create(State, { color: { type: 'Green' }, timer: 6 });
    await mount(() => <TrafficLight light={light} />);

    expect(interactor.isBlinking).toBe(true);
  });
});
