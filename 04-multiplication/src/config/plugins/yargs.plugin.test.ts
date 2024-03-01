import { beforeEach } from 'node:test';


const runCommand = async ( args: string[] ) => {
  process.argv = [ ...process.argv, ...args ];
  
  const { yarg } = await import('./yargs.plugin');

  return yarg
}

describe('yargs.plugin', () => {

  const originalArgv = process.argv; 

  afterEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {
    const yarg = await runCommand(['-b', '5']);

    expect(yarg).toEqual(expect.objectContaining({
      base: 5,
      limit: 10,
      show: false,
      name: 'multiplication-table',
      destination: 'outputs'
    }));

  });

  test('should return configuration with custom values', async () => {
    const yarg = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom', '-d', 'custom']);
    
    expect(yarg).toEqual(expect.objectContaining({
      b: 8,
      l: 20,
      s: true,
      n: 'custom',
      d: 'custom'
    }));

  });

});