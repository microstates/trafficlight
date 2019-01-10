import { create } from 'microstates';
import Union from './union';

const Activity = Union({
  Walking: Activity => class extends Activity {},
  Standing: Activity => class extends Activity {},
  Running: Activity => class extends Activity {}
}, class {
  stop() {
    return this.type.toStanding();
  }
  run() {
    return this.type.toRunning();
  }
  walk() {
    return this.type.toWalking();
  }
});


export default class Person {
  activity = Activity.Standing.create();
}
