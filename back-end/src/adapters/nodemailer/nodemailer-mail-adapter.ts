import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2934e9b5906880",
    pass: "00b83d65d8a8d6"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe feedback <oi@feedback.com>',
      to: 'Vinicius Silva <viniciusfabi1@gmail.com>',
      subject,
      html: body,
    });
  };}