import 'jest';
import Person from './person';
import { create, valueOf } from 'microstates';

describe('Person state', () => {
  describe('activity', () => {

    describe('Standing state', () => {

      let person;
      beforeEach(() => {
        person = create(Person);
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
  
        it('has value of walking', () => {
          expect(valueOf(person.activity)).toBe('walking');
        });
      });

      describe('run transition', () => {
        beforeEach(() => {
          person = person.activity.run();
        });

        it('is running', () => {
          expect(person.activity.isRunning).toBe(true)
        });

        it('has value of running', () => {
          expect(valueOf(person.activity)).toBe('running');
        });
      });
  
    });
  
    describe('Walking state', () => {

      let person;
      beforeEach(() => {
        person = create(Person, { activity: 'walking' });
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

        it('has value of standing', () => {
          expect(valueOf(person.activity)).toBe('standing');
        });
      });

      describe('run transition', () => {
        beforeEach(() => {
          person = person.activity.run();
        });

        it('is running', () => {
          expect(person.activity.isRunning).toBe(true)
        });

        it('has value of running', () => {
          expect(valueOf(person.activity)).toBe('running');
        });
      });
    });

    describe('Running state', () => {
      let person;
      beforeEach(() => {
        person = create(Person, { activity: 'running' });
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
  
        it('has value of walking', () => {
          expect(valueOf(person.activity)).toBe('walking');
        });
      });

      describe('stop transition', () => {
        beforeEach(() => {
          person = person.activity.stop();
        });

        it('is standing', () => {
          expect(person.activity.isStanding).toBe(true);
        });

        it('has value of standing', () => {
          expect(valueOf(person.activity)).toBe('standing');
        });
      });

    });
  });



});