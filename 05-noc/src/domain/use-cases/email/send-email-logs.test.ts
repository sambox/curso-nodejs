import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";


describe('Send Email Logs', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const emailServiceMock = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    // sendEmail: jest.fn(),
    // transporter: jest.doMock('nodemailer')
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should send email with logs', async () => {
    
    const sendEmailLogs = new SendEmailLogs(emailServiceMock as any, mockRepository);

    const result = await sendEmailLogs.execute('sarasa@gmail.com');

    expect(result).toBeTruthy();
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  test('should send throw an error', async () => {
    
    emailServiceMock.sendEmailWithFileSystemLogs.mockResolvedValue(false);
  
    const sendEmailLogs = new SendEmailLogs(emailServiceMock as any, mockRepository);
    
    const result = await sendEmailLogs.execute('sarasa@gmail.com');
    expect(result).toBe(false);
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });


});