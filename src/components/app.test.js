import React from "react";
import { mount } from "@bigtest/react";
import { when } from '@bigtest/convergence';

import { IntersectionInteractor } from './intersection.test';
import App from './app';

describe("<App />", () => {
  let intersection = new IntersectionInteractor();

  it('is alive', async () => {
    await mount(() => <App />);

    expect(intersection.light.isRed).toBe(true);
    expect(intersection.pedestrian.isStanding).toBe(true);

    await when(() => intersection.light.isGreen);

    expect(intersection.light.isGreen).toBe(true);
    expect(intersection.pedestrian.isWalking).toBe(true);
  });
});
