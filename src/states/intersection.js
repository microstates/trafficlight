import TrafficLight from './traffic-light';
import Person from './person';

export default class Intersection {
  pedestrian = Person;
  light = TrafficLight;

  tick() {
    let next  = this.light.cycle();

    let { light, pedestrian } = next;

    if (light.isGreen && !pedestrian.isWalking) {
      return next.pedestrian.activity.walk();
    } else if (light.isYellow && !pedestrian.isRunning) {
      return next.pedestrian.activity.run();
    } else if (light.isRed && !pedestrian.isStanding) {
      return next.pedestrian.activity.stop();
    }

    return next;    
  }
}
