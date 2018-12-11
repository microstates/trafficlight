import TrafficLight from "./traffic-light";
import Person from "./person";

export default class Intersection {
  pedestrian = Person;
  light = TrafficLight;

  tick() {
    let next = this.light.cycle();

    let {
      light: { color },
      pedestrian: { activity }
    } = next;

    if (color.isGreen) {
      return activity.walk();
    } else if (color.isYellow) {
      return activity.run();
    } else if (color.isRed) {
      return activity.stop();
    }

    return next;
  }
}
