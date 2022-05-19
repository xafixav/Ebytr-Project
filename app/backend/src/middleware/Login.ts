import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../schema/LoginSchema';

export default class LoginMiddleware {
  public loginIsValid = (req: Request, res: Response, next: NextFunction) => {
    const { user, password } = req.body;
    if (!user || !password) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }
    next();
  };
}
