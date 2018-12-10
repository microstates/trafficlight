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