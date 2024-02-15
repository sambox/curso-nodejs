import { httpClientAdapter } from "../../src/plugins/http-client.adapter";

describe('plugins/http-client.adapter', () => {

  test('httpclient get should return a string', async () => {

    const data = await httpClientAdapter.get('https://jsonplaceholder.typicode.com/todos/1');

    expect(data).toEqual({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean)
    })

  })

  test('http client has POST, PUT and DELETE methods', () => {
    expect(httpClientAdapter).toHaveProperty('post')
    expect(httpClientAdapter).toHaveProperty('put')
    expect(httpClientAdapter).toHaveProperty('delete')

    expect(typeof httpClientAdapter.post).toBe('function')
    expect(typeof httpClientAdapter.put).toBe('function')
    expect(typeof httpClientAdapter.delete).toBe('function')
  })

})