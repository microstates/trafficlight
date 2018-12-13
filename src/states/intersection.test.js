import { create } from "microstates";
import Intersection from "./intersection";

describe("Intersection State", () => {
  describe("Walking pedestrian on green", () => {
    let intersection;
    beforeEach(() => {
      intersection = create(Intersection, {
        light: { color: "green", timer: 3 }
      });
    });
    it("has pedestrian walking", () => {
      expect(intersection.pedestrian.activity.isWalking).toBe(true);
    });
    it('has timer at 3', () => {
      expect(intersection.light.timer.state).toBe(3);
    });
    describe("next tick", () => {
      beforeEach(() => {
        intersection = intersection.tick();
      });
      it('decremented the timer', () => {
        expect(intersection.light.timer.state).toBe(2);
      });
      it("transitioned pedestrian to walking", () => {
        expect(intersection.pedestrian.activity.isWalking).toBe(true);
      });
    });
  });
  describe("Walking pedestrian on yellow", () => {
    let intersection;
    beforeEach(() => {
      intersection = create(Intersection, {
        light: { color: "yellow", timer: 3 },
        pedestrian: { activity: "walking" }
      }).tick();
    });
    it('has yellow light', () => {
      expect(intersection.light.color.isYellow).toBe(true);
    });
    it('has pedestrian running', () => {
      expect(intersection.pedestrian.activity.isRunning).toBe(true);
    });
    it('decremented the timer', () => {
      expect(intersection.light.timer.state).toBe(2);
    });
  });
  describe("Running pedestrian on red", () => {
    let intersection;
    beforeEach(() => {
      intersection = create(Intersection, {
        light: { color: 'red', timer: 3 },
        pedestrian: { activity: 'running' }
      }).tick();
    });
    it('has red light', () => {
      expect(intersection.light.color.isRed).toBe(true);
    });
    it('stopped the pedestrian', () => {
      expect(intersection.pedestrian.activity.isStanding).toBe(true);
    });
  });
});
