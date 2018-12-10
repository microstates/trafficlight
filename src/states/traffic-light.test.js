import 'jest';
import { create, valueOf } from 'microstates';
import TrafficLight, { Color } from './traffic-light';

describe('Traffic Light State', () => {
  let light;

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
        light = create(TrafficLight, { color: 'red' });
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
        light = create(TrafficLight, { color: 'green' });
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
        light = create(TrafficLight, { color: 'yellow' });
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
        color = create(Color, 'red');
      });
      it('initializes into red', () => {
        expect(color.isRed).toBe(true);
      });
      it('has red as value', () => {
        expect(valueOf(color)).toBe('red');
      })
  
      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to green', () => {
          expect(color.isGreen).toBe(true);
        });
        it('has green as value', () => {
          expect(valueOf(color)).toBe('green');
        });
      });
    });

    describe('Green state', () => {
      beforeEach(() => {
        color = create(Color, 'green');
      });
      it('initializes to green', () => {
        expect(color.isGreen).toBe(true);
      });
      it('has green as value', () => {
        expect(valueOf(color)).toBe('green');
      });
      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to yellow', () => {
          expect(color.isYellow).toBe(true);
        });
        it('has yellow as value', () => {
          expect(valueOf(color)).toBe('yellow');
        });
      });
    });

    describe('Yellow state', () => {
      beforeEach(() => {
        color = create(Color, 'yellow');
      });
      it('initializes to yellow', () => {
        expect(color.isYellow).toBe(true);
      });
      it('has yellow as value', () => {
        expect(valueOf(color)).toBe('yellow');
      });
      describe('change transition', () => {
        beforeEach(() => {
          color = color.change();
        });
        it('transitions to red', () => {
          expect(color.isRed).toBe(true);
        });
        it('has red as value', () => {
          expect(valueOf(color)).toBe('red');
        });
      });
    });
  });


});