import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer
      .createTestAccount()
      .then(account => {
        const tranporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = tranporter;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
        // eslint-disable-next-line no-console
        console.log('Erro na criação da conta de teste:');
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');

        const tranporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: 'ernesto.hayes25@ethereal.email',
            pass: 'TX7kNVWvRTFBZRUgUj',
          },
        });

        this.client = tranporter;
      });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe SBS Reciclagem Eletrônica',
        address: from?.email || 'contado@sbsreciclagemeletronica.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
