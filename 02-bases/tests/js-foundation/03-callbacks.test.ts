import { getUserById } from "../../src/js-foundation/03-callbacks";

describe('js-foundation/03-callbacks.ts', () => {

  test('getUserById should return an error if user does not exist', (done) => {
    const id = 10;
    getUserById(id, (err, user) => {
      expect(err).toBe(`user not found with id ${id}`);
      expect(user).toBeUndefined();
      done();
    })
  })

  test('getUserById shoult return a user with id 1 and name John Doe', (done) => {
    const id = 1;
    getUserById(id, (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toBeDefined();
      expect(user).toHaveProperty('name');
      expect(user?.name).toBe('John Doe');
      done()
    })
  })


})