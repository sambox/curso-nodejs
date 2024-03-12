import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('check-service.ts', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(mockRepository, successCallback, errorCallback);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call successCallback when fetch returns true', async () => {

    const wasOk = await checkService.execute('http://www.google.com');
    
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  test('should call successCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute('http://www.google123r1fqwecqw.com');
    
    expect(wasOk).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

})