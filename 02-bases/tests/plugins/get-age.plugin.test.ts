import { getAge } from "../../src/plugins";

describe('plugins/get-age.plugin.ts', () => {

  test('getAge() should return the age of a person', () => {
    const bod = '1989-08-21';
  
    const age = getAge(bod);

    expect(typeof age).toBe('number');
  });

  test('getAge() should return the age of a person', () => {
    const bod = '1989-08-21';
    const calculatedAge = new Date().getFullYear() - new Date(bod).getFullYear();
    
    const age = getAge(bod);
  
    expect(age).toBe(calculatedAge);
  });

  test('getAge should return zero years', () => {

    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1989);
    const bod = '1989-08-21';
  
    const age = getAge(bod);

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockReset();

  })

})