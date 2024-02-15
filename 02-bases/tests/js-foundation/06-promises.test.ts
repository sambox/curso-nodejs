import { getPokemonById } from "../../src/js-foundation/06-promises";

describe('js-foundation/06-promises', () => {

  test('getPokemonById should return a pokemon', async () => {
    const pokemonId = 1;
    const pokemonName = await getPokemonById(pokemonId);

    expect(pokemonName).toBe('bulbasaur')
  })

  test('should return an error if pokemon not exists', async () => {
    const pokemonId = 100000;

    try {
      await getPokemonById(pokemonId);
    } catch (error) {
      expect(error).toBe(`pokemon not found with id ${pokemonId}`);
    }


  })

})