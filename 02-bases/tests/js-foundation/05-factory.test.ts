import { buildMakePerson } from "../../src/js-foundation/05-factory"

describe('js-foundation/05-factory.ts', () => {

  const getUUID = () => '1234';
  const getAge = () => 34;
  
  test('build make person should return a function', () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    
    expect(typeof makePerson).toBe('function');
  });

  test('makePerson should return a person object', () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    const johnDoe = makePerson({name: 'John Doe', bod: '1989-08-21'});

    expect(johnDoe).toEqual({id: '1234',name: 'John Doe', birthDate: '1989-08-21', age: 34})
  })

})