// const { getId, getAge } = require('./plugins');
// const {emailTemplate} = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring')
// console.log(emailTemplate);
// const { getUserById } = require('./js-foundation/03-callbacks');

// getUserById(1, (err, user) => {
//   if (err) {
//     throw new Error(err)
//   }
//   console.log(user);
// })

// factory functions
// const { buildMakePerson } = require('./js-foundation/05-factory');
// const makePerson = buildMakePerson({getId, getAge});
// const obj = {name: 'John', birthDate: '1989-08-21'};
// const johnDoe = makePerson(obj);
// console.log(johnDoe);

// const getPokemonById = require('./js-foundation/06-promises');
// import { getPokemonById } from "./js-foundation/06-promises";

// getPokemonById(4)
// .then(pokemon => console.log({pokemon}))
// .catch(err => console.log(err));

// const { buildLogger } = require('./plugins');
// import { buildLogger } from "./plugins/logger.plugin";
// const logger = buildLogger('app.js');

// logger.log('sarasa')
// logger.error('esto es un error')

// export const name: string = 'seba';

// logger.log('hola mundo ' + name);
