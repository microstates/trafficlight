import { create } from "microstates";

const LONG_TIME = 15;
const SHORT_TIME = 5;

export default class TrafficLight {
  color = create(Color, 'red');
  timer = create(Number, LONG_TIME);

  initialize(value = {}) {
    if (value.color === 'yellow' && value.timer === undefined) {
      return this.timer.set(SHORT_TIME);
    }
    return this;
  }

  get isBlinking() {
    return this.color.isGreen && this.color.timer.state < 7;
  }

  cycle() {
    let next = this.timer.decrement();
    if (next.timer.state <= 0) {
      // when the time expired, change the color      
      let changed = next.color.change();
      if (changed.color.isYellow) {
        // yellow only runs for 5 seconds
        return changed.timer.set(SHORT_TIME);
      } else {
        // all other run for full 15 seconds
        return changed.timer.set(LONG_TIME);
      }
    } else {
      return next;
    }
  }
}

export class Color {
  initialize(value) {
    switch (value) {
      case 'green': 
        return create(Green, this);
      case 'yellow':
        return create(Yellow, this);
      case 'red':
        return create(Red, this);
      default:
        return this;
    }
  }
}

class Red extends Color {
  get isRed() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }

  change() {
    return this.set('green');
  }
}

class Yellow extends Color {
  get isYellow() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }

  change() {
    return this.set('red');
  }
}

class Green extends Color {
  get isGreen() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }
  
  change() {
    return this.set('yellow');
  }
}