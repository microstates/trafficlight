import { create } from "microstates";

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
    let next = this.color.timer.decrement();
    if (next.state.color.timer <= 0) {
      return next.color.change();
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
        return create(Green, { timer: 15 });
      case 'yellow':
        return create(Yellow, { timer: 5 });
      case 'red':
        return create(Red, { timer: 15 });
      default:
    }
  }
}

class Red extends Color {
  change() {
    return create(Green, { timer: 15 });
  }
}

class Yellow extends Color {
  change() {
    return create(Red, { timer: 15 });
  }
}

class Green extends Color {
  change() {
    return create(Yellow, { timer: 5 });
  }
}