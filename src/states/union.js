import { create, valueOf, Primitive } from 'microstates';

export default function Union(members, Base = class {}) {
  let types = Object.keys(members);

  let UnionType = class extends Base {

    type = TypeId(types);

    initialize(value) {
      let { type } = value == null ? {} : value;
      assert(type != null && types.includes(type),
             `when re-structuring a Union type, the 'type' field must be one of [${types}], but it was '${type}'`);

      return create(UnionType[type], value);
    }
  };

  types.forEach(type => {
    let Constructor = members[type](UnionType);

    Object.defineProperty(UnionType.prototype, `is${type}`, {
      enumerable: false,
      value: false
    })

    Object.defineProperty(Constructor.prototype, `is${type}`, {
      enumerable: false,
      value: true
    });

    Object.defineProperty(Constructor.prototype, `initialize`, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(...args) {
        if (valueOf(this).type === type) {
          return this;
        } else {
          return UnionType.prototype.initialize(...args);
        }
      }
    });

    Object.defineProperty(Constructor,  'name', {
      enumerable: false,
      configurable: true,
      value: type
    });
    Constructor.create = (value) => {
      return create(Constructor, { type, value });
    };
    UnionType[type] = Constructor;
  });

  return UnionType;
}


function TypeId(types) {

  class TypeId extends Primitive {}

  types.forEach(type => {
    Object.defineProperty(TypeId.prototype, `to${type}`, {
      enumerable: false,
      configurable: true,
      writable: true,
      value() {
        return this.set(type);
      }
    });
  });

  return TypeId;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
