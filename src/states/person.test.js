import Person from './person';
import { create, valueOf } from 'microstates';

describe('Person state', () => {
  describe('activity', () => {

    describe('Standing state', () => {

      let person;
      beforeEach(() => {
        person = create(Person, { activity: { type: 'Standing' } });
      });

      it('initializes to standing without initial value', () => {
        expect(person.activity.isStanding).toBe(true);
      });

      describe('walk transition', () => {
        beforeEach(() => {
          person = person.activity.walk();
        });

        it('is walking', () => {
          expect(person.activity.isWalking).toBe(true);
        });
      });

      describe('run transition', () => {
        beforeEach(() => {
          person = person.activity.run();
        });

        it('is running', () => {
          expect(person.activity.isRunning).toBe(true)
        });
      });

    });

    describe('Walking state', () => {

      let person;
      beforeEach(() => {
        person = create(Person, { activity: { type: 'Walking'  } });
      });

      it('initializes to walking when activitiy value is walking', () => {
        expect(person.activity.isWalking).toBe(true);
      });

      describe('stop transition', () => {
        beforeEach(() => {
          person = person.activity.stop();
        });

        it('is standing', () => {
          expect(person.activity.isStanding).toBe(true);
        });
      });

      describe('run transition', () => {
        beforeEach(() => {
          person = person.activity.run();
        });

        it('is running', () => {
          expect(person.activity.isRunning).toBe(true)
        });
      });
    });

    describe('Running state', () => {
      let person;
      beforeEach(() => {
        person = create(Person, { activity: { type: 'Running' } });
      });

      it('initializes into running state when value is running', () => {
        expect(person.activity.isRunning).toBe(true);
      });

      describe('walk transition', () => {
        beforeEach(() => {
          person = person.activity.walk();
        });

        it('is walking', () => {
          expect(person.activity.isWalking).toBe(true);
        });
      });

      describe('stop transition', () => {
        beforeEach(() => {
          person = person.activity.stop();
        });

        it('is standing', () => {
          expect(person.activity.isStanding).toBe(true);
        });
      });
    });
  });
});
