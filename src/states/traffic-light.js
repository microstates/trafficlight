import { create } from "microstates";

const LONG_TIME = 15;
const SHORT_TIME = 5;

export default class TrafficLight {
  color = Color;

  get isBlinking() {
    return this.color.isGreen && this.color.timer.state < 7;
  }
}

export class Color {
  timer = create(Number, LONG_TIME)

  initialize(value) {
    switch (value) {
      case 'green': 
        return create(Green);
      case 'yellow':
        return create(Yellow);
      case 'red':
        return create(Red);
      default:
        return this;
    }
  }

  cycle() {
    let next = this.timer.decrement();

    if (next.timer.state === 0) {
      return this.change();
    } else {
      return next;
    }
  }
}

class Red extends Color {
  get isRed() {
    return true;
  }

  change() {
    return create(Green);
  }
}

class Yellow extends Color {
  timer = create(Number, SHORT_TIME)

  get isYellow() {
    return true;
  }

  change() {
    return create(Red);
  }
}

class Green extends Color {
  get isGreen() {
    return true;
  }
  
  change() {
    return create(Yellow);
  }
}