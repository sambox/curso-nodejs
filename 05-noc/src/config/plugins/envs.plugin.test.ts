import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {

  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'infosbs1@gmail.com',
      MAILER_EMAIL: 'infosbs1@gmail.com',
      MAILER_SECRET_KEY: '123412341234',
      PROD: false,
      MONGO_URL: 'mongodb://root:12345678@localhost:27017/',
      MONGO_DB_NAME: 'noc-test',
      MONGO_USER: 'root',
      MONGO_PASS: '12345678',
      POSTGRES_URL: 'mongodb://root:12345678@localhost:27017/',
      POSTGRES_DB: 'noc-test',
      POSTGRES_USER: 'root',
      POSTGRES_PASSWORD: '12345678'
    })
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(`${error}`).toContain(`EnvVarError: env-var: "PORT" should be a valid integer`);
    }
  });

});