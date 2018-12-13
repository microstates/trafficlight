import { create } from 'microstates';

class Activity {
  initialize(value) {
    switch(value) {
      case 'running':
        return create(Running, this);
      case 'walking':
        return create(Walking, this);
      case 'standing':
        return create(Standing, this);
      default:
        return this;
    }
  }

  stop() {
    return this.set('standing');
  }

  run() {
    return this.set('running');
  }

  walk() {
    return this.set('walking');
  }
}

class Walking extends Activity {
  get isWalking() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }
}

class Standing extends Activity {
  get isStanding() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }
}

class Running extends Activity {
  get isRunning() {
    return true;
  }

  initialize(value) {
    return super.initialize(value);
  }
}

export default class Person {
  activity = Activity;
}