import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('email-service.test.ts', () => {

  const mockSendMail = jest.fn();

  // mock create transport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  const email = 'sarasafqwefvrce@gmail.com';

  const emailService = new EmailService();

  test('should send an email', async () => {
    const options: SendMailOptions = {
      to: email,
      subject: 'test',
      htmlBody: '<h1>test</h1>'
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>test</h1>",
      subject: "test",
      to: email,
    })

  });


  test('should send an email with attachments', async () => {

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'server logs',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: 'logs-all.log',
          path: './logs/logs-all.log'
        },
        {
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log'
        },
        {
          filename: 'logs-high.log',
          path: './logs/logs-high.log'
        }])
    })

  });

});