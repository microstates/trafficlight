import { create, valueOf } from 'microstates';
import TrafficLight, { Color } from './traffic-light';

describe('Traffic Light State', () => {
  let light;

  describe('cycle transition', () => {
    describe('from green', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: { type: 'Green' }, timer: 1 }).cycle();
      });
      it('transitions to yellow', () => {
        expect(light.color.isYellow).toBe(true);
      });
      it('gets a new timer of 5 seconds', () => {
        expect(light.timer.state).toBe(5);
      });
    });

    describe('from red', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: { type: 'Red' }, timer: 1 }).cycle();
      });
      it('transitions to green', () => {
        expect(light.color.isGreen).toBe(true);
      });
      it('gets a new timer of 15 seconds', () => {
        expect(light.timer.state).toBe(15);
      });
    });
    describe('from yellow', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: {type: 'Yellow' }, timer: 1 }).cycle();
      });
      it('transitions to red', () => {
        expect(light.color.isRed).toBe(true);
      });
      it('gets a new timer of 15 seconds', () => {
        expect(light.timer.state).toBe(15);
      });
    });
  });

  describe('without value', () => {
    beforeEach(() => {
      light = create(TrafficLight)
    });

    it('initializes into red value is not specified', () => {
      expect(light.color.isRed).toBe(true);
    });

    it('initializes timer to 15', () => {
      expect(light.timer.state).toBe(15);
    });
  });

  describe('with color but without timer', () => {
    describe('when color is red', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: { type: 'Red' } });
      });

      it('initializes into red', () => {
        expect(light.color.isRed).toBe(true);
      });

      it('initializes timer to 15', () => {
        expect(light.timer.state).toBe(15);
      });
    });

    describe('when color is green', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: { type: 'Green' } });
      });

      it('initializes into green', () => {
        expect(light.color.isGreen).toBe(true);
      });

      it('initializes timer to 15', () => {
        expect(light.timer.state).toBe(15);
      });
    });

    describe('when color is yellow', () => {
      beforeEach(() => {
        light = create(TrafficLight, { color: { type: 'Yellow' } });
      });

      it('initializes into yellow', () => {
        expect(light.color.isYellow).toBe(true);
      });

      it('initializes timer to 5', () => {
        expect(light.timer.state).toBe(5);
      });
    });
  });

  describe('Color state', () => {
    let color;
    describe('Red state', () => {
      beforeEach(() => {
        color = Color.Red.create();
      });
      it('initializes into red', () => {
        expect(color.isRed).toBe(true);
      });
      it('has red as value', () => {
        expect(color.type.state).toEqual('Red');
      })

      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to green', () => {
          expect(color.isGreen).toBe(true);
        });
        it('has green as value', () => {
          expect(color.type.state).toBe('Green');
        });
      });
    });

    describe('Green state', () => {
      beforeEach(() => {
        color = Color.Green.create();
      });
      it('initializes to green', () => {
        expect(color.isGreen).toBe(true);
      });
      it('has green as value', () => {
        expect(color.type.state).toBe('Green');
      });
      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to yellow', () => {
          expect(color.isYellow).toBe(true);
        });
        it('has yellow as value', () => {
          expect(color.type.state).toBe('Yellow');
        });
      });
    });

    describe('Yellow state', () => {
      beforeEach(() => {
        color = Color.Yellow.create();
      });
      it('initializes to yellow', () => {
        expect(color.isYellow).toBe(true);
      });
      it('has yellow as value', () => {
        expect(color.type.state).toBe('Yellow');
      });
      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to red', () => {
          expect(color.isRed).toBe(true);
        });
        it('has red as value', () => {
          expect(color.type.state).toBe('Red');
        });
      });
    });
  });
});
