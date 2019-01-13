import TrafficLight from "./traffic-light";
import Person from "./person";

export default class Intersection {
  pedestrian = Person;
  light = TrafficLight;

  initialize() {
    return this.instructPedestrian();
  }

  instructPedestrian() {

    let {
      light: { color },
      pedestrian: { activity }
    } = this;

    if (color.isGreen) {
      return activity.walk();
    }

    if (color.isYellow) {
      return activity.run();
    }

    return activity.stop();
  }

  tick() {
    return this.light.cycle().instructPedestrian();
  }
}
