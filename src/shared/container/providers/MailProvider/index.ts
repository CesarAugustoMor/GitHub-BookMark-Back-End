import mailConfig from '@config/mail';
import { container } from 'tsyringe';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESEmailProvider from './implementations/SESEmailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
