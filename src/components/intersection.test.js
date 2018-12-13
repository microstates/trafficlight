import React from "react";
import { mount } from "@bigtest/react";
import Interactor from "@bigtest/interactor";
import { when } from '@bigtest/convergence';
import { create, Store } from "microstates";

import Intersection from "./intersection";
import IntersectionState from "../states/intersection";

import { PedestrianInteractor } from "./pedestrian.test";
import { TrafficLightInteractor } from "./traffic-light.test";

export const IntersectionInteractor = Interactor.extend(
  class {
    static defaultScope = "main";
    light = new TrafficLightInteractor();
    pedestrian = new PedestrianInteractor();
  }
);

async function mountState(initial, render) {
  class MountState extends React.Component {
    state = {
      $: Store(initial, $ => this.setState({ $ }))
    };
    render() {
      return render(this.state.$);
    }
  }

  await mount(() => <MountState />);
}

describe("<Intersection />", () => {
  const intersection = new IntersectionInteractor();

  it("goes from green to yellow", async () => {
    let state = create(IntersectionState, {
      light: { color: 'green', timer: 1 }
    });

    await mountState(state, $ => <Intersection intersection={$} />);

    expect(intersection.light.isGreen).toBe(true);
    expect(intersection.light.isBlinking).toBe(true);
    expect(intersection.pedestrian.isWalking).toBe(true);

    await when(() => intersection.light.isYellow);

    expect(intersection.pedestrian.isStanding).toBe(false);
    expect(intersection.light.isBlinking).toBe(false);
    expect(intersection.pedestrian.isRunning).toBe(true);
  });

  it('goes from yellow to red', async () => {
    let state = create(IntersectionState, {
      light: { color: 'yellow', timer: 1 }
    });

    await mountState(state, $ => <Intersection intersection={$} />);
    
    expect(intersection.light.isYellow).toBe(true);
    expect(intersection.pedestrian.isRunning).toBe(true);

    await when(() => intersection.light.isRed);

    expect(intersection.light.isRed).toBe(true);
    expect(intersection.pedestrian.isRunning).toBe(false);
    expect(intersection.pedestrian.isStanding).toBe(true);
  });

  it('goes from red to green', async () => {
    let state = create(IntersectionState, {
      light: { color: 'red', timer: 1 }
    });

    await mountState(state, $ => <Intersection intersection={$} />);

    expect(intersection.light.isRed).toBe(true);
    expect(intersection.pedestrian.isStanding).toBe(true);

    await when(() => intersection.light.isGreen);

    expect(intersection.light.isRed).toBe(false);
    expect(intersection.light.isGreen).toBe(true);
    expect(intersection.pedestrian.isStanding).toBe(false);
    expect(intersection.pedestrian.isWalking).toBe(true);
  });
});
