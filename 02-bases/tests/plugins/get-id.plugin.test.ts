import { getId } from "../../src/plugins";

describe('plugins/get-id.plugin.ts', () => {

  test('should return a string id', () => {
    const uuid = getId();

    expect(uuid.length).toBe(36);
    expect(typeof uuid).toBe('string')
  })

})