// const getPokemonById = (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//   return fetch(url)
//   .then(response => response.json())
//   // .then(e => { throw new Error('el bicho no existe') })
//   .then(pokemon => pokemon.name)
// }

// const { http } = require('../plugins');
import { httpClient } from '../plugins'

export const getPokemonById = async (id: string | number): Promise<string> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // const response = await fetch(url)
    const pokemon = await httpClient.get(url);
  
    // throw new Error('try again x gato')
  
    return pokemon.name;
    
  } catch (error) {
    return `pokemon not found with id ${id}`;
  }
}
