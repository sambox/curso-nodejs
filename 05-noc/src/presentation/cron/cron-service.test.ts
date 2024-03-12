import { CronService } from "./cron-service"


describe('cron-service.test.ts', () => {

  const mockTick = jest.fn();

  test('should create a cron job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(1);
      job.stop();
      done();
    }, 1000);

  });

  

})