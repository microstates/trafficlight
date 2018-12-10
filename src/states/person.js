import { create } from 'microstates';

export default class Person {
  activity = Activity;
  name = String;
}

class Activity {
  initialize(value) {
    switch(value) {
      case 'running':
        return create(Running, this);
      case 'walking':
        return create(Walking, this);
      case 'standing':
        return create(Standing, this);
      case undefined:
        return this.set('standing');
      default:
        return this;
    }
  }
}

class Walking extends Activity {
  get isWalking() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }

  stop() {
    return this.set('standing');
  }

  run() {
    return this.set('running');
  }
}

class Standing extends Activity {
  get isStanding() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }

  walk() {
    return this.set('walking');
  }

  run() {
    return this.set('running');
  }
}

class Running extends Activity {
  get isRunning() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }

  stop() {
    return this.set('standing');
  }

  walk() {
    return this.set('walking');
  }
}