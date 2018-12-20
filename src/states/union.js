import { create } from 'microstates';

export default function Union(members) {
  let tags = Object.keys(members);
  debugger;

  let UnionType = class {
    initialize(value) {
      let { _tag } = value;
      let Constructor = UnionType[_tag];
      if (Constructor) {
        return create(Constructor, value);
      } else {
        let [ defaultTag ] = tags;
        let Default = UnionType[defaultTag];
        return create(Default, {...value, type: defaultTag });
      }
    }
  };

  tags.forEach(tag => {
    let Constructor = members[tag](UnionType);
    Object.defineProperty(Constructor,  'name', {
      enumerable: false,
      configurable: true,
      value: tag 
    });
    Object.defineProperty(Constructor.prototype, `is${tag}`, {
      enumerable: false,
      value: true
    });
    Constructor.create = (value = {}) => {
      return create(Constructor, {_tag: tag, ...value });
    };
    UnionType[tag] = Constructor;
  });
}