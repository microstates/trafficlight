import Union from './union';
import { create, valueOf } from 'microstates';

describe('Using a union type to construct a Maybe value', ()=> {
  function Maybe(Type) {
    return Union({
      Just: Maybe => class extends Maybe {
        value = Type;

        disintegrate() {
          return Maybe.Nothing.create();
        }

      },
      Nothing: Maybe => class extends Maybe {}
    });
  }

  let Type;
  beforeEach(()=> {
    Type = Maybe(Number);
  });

  it('cannot construct a type directly without passing it a valid serialized form', ()=> {
    expect(()=> create(Type)).toThrow('[Just,Nothing]');
  });

  it('has a constructor for each member of the union', ()=> {
    expect(Type).toBeDefined();
    expect(Type).toBeInstanceOf(Function);
    expect(Type.Just).toBeInstanceOf(Function);
    expect(Type.Nothing).toBeInstanceOf(Function);
  });

  it('creates each member as a subclass of union type', ()=> {
    let { Just, Nothing } = Type;
    expect(Just.prototype).toBeInstanceOf(Type);
    expect(Nothing.prototype).toBeInstanceOf(Type);
  });

  it('sets the name of the union members', ()=> {
    let { Just, Nothing } = Type;
    expect(Just.name).toEqual('Just');
    expect(Nothing.name).toEqual('Nothing');
  });


  describe('constructing an instance of Just', ()=> {
    let just;
    beforeEach(()=> {
      let { Just } = Type;
      just = Just.create(5);
    });
    it('gives you a value that is an instance of Just, and also contains the attributes.', ()=> {
      expect(just).toBeInstanceOf(Type.Just);
      expect(just.isJust).toEqual(true);
      expect(just.isNothing).toEqual(false)
    });
    it('it has as its value, an instance of Number', ()=> {
      expect(just.value.state).toEqual(5);
    });

    describe('transitioning the value', ()=> {
      let next;
      beforeEach(()=> {
        next = just.value.increment();
      });
      it('properly updates the whole structure', ()=> {
        expect(next).toBeInstanceOf(Type.Just);
        expect(next.value.state).toEqual(6);
      });
    });

    describe('invoking a custom transition to another state', () => {
      let next;

      beforeEach(()=> {
        next = just.disintegrate()
      });

      it('returns the nothing', ()=> {
        let { Nothing } = Type;
        expect(next).toBeInstanceOf(Nothing);
      });
    })
  });

});
