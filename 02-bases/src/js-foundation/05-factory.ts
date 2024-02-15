// const { getId, getAge } = require('../plugins');
// const obj = {name: 'John', birthDate: '1989-08-21'}

interface BuildMakePersonOptions {
  getUUID: () => string;
  getAge: (bod: string) => number,
}

interface PersonOptions {
  name: string,
  bod: string
}

export const buildMakePerson = ({getUUID, getAge}: BuildMakePersonOptions) => {

  return ({name, bod}: PersonOptions) => {
    return {
      id: getUUID(),
      name: name,
      birthDate: bod,
      age: getAge(bod)
    }
  };

}



// const john = buildPerson(obj);

// console.log(john);
