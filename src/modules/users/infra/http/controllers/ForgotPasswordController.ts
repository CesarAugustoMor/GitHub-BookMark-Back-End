import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEMailService from '@modules/users/services/SendForgotPasswordEMailService';

export default class ForgotPasswordController {
  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEMail = container.resolve(
      SendForgotPasswordEMailService,
    );

    await sendForgotPasswordEMail.execute({ email });

    return res.status(204).send();
  }
}
