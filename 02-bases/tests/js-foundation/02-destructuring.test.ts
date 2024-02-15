import { characters } from "../../src/js-foundation/02-destructuring";

describe('js-foundation/02-destructuring', () => {

  test('characters should contain flash & superman', () => {
    expect(characters).toContain('flash');
    expect(characters).toContain('superman');
  });

  test('first character should be flash and the second one superman', () => {
    const [flash, superman] = characters;
    expect(flash).toBe('flash');
    expect(superman).toBe('superman');
  })

})