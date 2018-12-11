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

    if (color.isGreen && !activity.isWalking) {
      return activity.walk();
    } else if (color.isYellow && !activity.isRunning) {
      return activity.run();
    } else if (color.isRed && !activity.isStanding) {
      return activity.stop();
    }

    return next;
  }
}
