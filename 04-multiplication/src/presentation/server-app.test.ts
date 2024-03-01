import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";


describe('Server App', () => {

  const runOptions = {
    base: 3,
    limit: 5,
    show: false,
    fileName: 'test-filename',
    destination: 'test-destination'
  };

  test('should create ServerApp instance', () => {

    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');

  });

  test('should run ServerApp with options', () => {

    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    const runOptions = {
      base: 3,
      limit: 5,
      show: false,
      fileName: 'test-filename',
      destination: 'test-destination'
    };

    ServerApp.run(runOptions);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenCalledWith('file created');
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({base: runOptions.base, limit: runOptions.limit});
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: runOptions.fileName,
      destination: runOptions.destination
    })

  });

  test('should run with custom values mocked', () => {

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('sarasa');
    const saveFileMock = jest.fn().mockReturnValue(true);

    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;
    console.log = logMock;
    console.error = logErrorMock;

    ServerApp.run(runOptions);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({base: runOptions.base, limit: runOptions.limit});
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'sarasa',
      fileName: runOptions.fileName,
      destination: runOptions.destination
    });
    expect(logMock).toHaveBeenCalledWith('file created');
    expect(logErrorMock).not.toHaveBeenCalled();
  });

});