

export class Intersection {
  pedestrian = Person;
  light = TrafficLight;

  tick() {
    let { light, pedestrian }  = this.light.color.cycle();

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
