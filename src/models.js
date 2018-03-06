import { create } from "microstates";

const LONG_TIME = 15;
const SHORT_TIME = 5;

export class Intersection {
  pedestrian = Person;
  light = TrafficLight;

  tick() {
    let next = this.light.cycle();

    let { state: { light, pedestrian } } = next;

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

export class Person {
  activity = Activity;
  name = String;

  get isWalking() {
    return this.activity instanceof Walking;
  } 

  get isStanding() {
    return this.activity instanceof Standing;
  }

  get isRunning() {
    return this.activity instanceof Running;
  }
}

export class TrafficLight {
  color = Color;
  timer = Number;

  get isBlinking() {
    return this.isGreen && this.timer < 7;
  }

  get isGreen() {
    return this.color instanceof Green;
  }

  get isRed() {
    return this.color instanceof Red;
  }

  get isYellow() {
    return this.color instanceof Yellow;
  }

  cycle() {
    let next = this.timer.decrement();
    if (next.state.timer <= 0) {
      let nextColor = next.color.change();
      if (nextColor.state.isGreen || nextColor.state.isRed) {
        return nextColor.timer.set(LONG_TIME);
      } else {
        return nextColor.timer.set(SHORT_TIME)
      }
    } else {
      return next;
    }
  }
}

class Activity {
  static create(value) {
    switch(value) {
      case 'standing':
        return create(Standing);
      case 'walking':
        return create(Walking);
      case 'running':
        return create(Running);
      default:
    }
  }
}

class Walking extends Activity {
  stop() {
    return create(Standing);
  }

  run() {
    return create(Running);
  }
}

class Standing extends Activity {
  walk() {
    return create(Walking);
  }

  run() {
    return create(Running);
  }
}

class Running extends Activity {
  stop() {
    return create(Standing);
  }

  walk() {
    return create(Walking);
  }
}

class Color {
  timer = Number; 

  static create(value) {
    switch (value) {
      case 'green': 
        return create(Green);
      case 'yellow':
        return create(Yellow);
      case 'red':
        return create(Red);
      default:
    }
  }
}

class Red extends Color {
  change() {
    return create(Green);
  }
}

class Yellow extends Color {
  change() {
    return create(Red);
  }
}

class Green extends Color {
  change() {
    return create(Yellow);
  }
}