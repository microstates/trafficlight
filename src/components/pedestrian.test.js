import React from "react";
import { mount } from "@bigtest/react";
import Interactor, { hasClass, property } from "@bigtest/interactor";
import { create } from "microstates";

import Pedestrian from "./pedestrian";
import Person from "../states/person";

const PedestrianInteractor = Interactor.extend(
  class {
    static defaultScope = ".pedestrian";
    alt = property("img", "alt");
    isWalking = hasClass("is-walking");
    isRunning = hasClass("is-running");
    isStanding = hasClass("is-standing");
  }
);

describe("<Pedestrian />", () => {
  let pedestrian = new PedestrianInteractor();

  it("is standing", async () => {
    let person = create(Person, { activity: "standing" });

    await mount(() => (
      <Pedestrian pedestrian={person} />
    ));

    expect(pedestrian.isStanding).toBe(true);
    expect(pedestrian.alt).toBe("Pedestrian is standing");
  });

  it("is running", async() => {
    let person = create(Person, { activity: "running" });

    await mount(() => (
      <Pedestrian pedestrian={person} />
    ));

    expect(pedestrian.isRunning).toBe(true);
    expect(pedestrian.alt).toBe("Pedestrian is running");
  });

  it("is walking", async() => {
    let person = create(Person, { activity: "walking" });

    await mount(() => (
      <Pedestrian pedestrian={person} />
    ));

    expect(pedestrian.isWalking).toBe(true);
    expect(pedestrian.alt).toBe("Pedestrian is walking");
  });
});
