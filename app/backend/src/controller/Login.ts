import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../service/Login';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
    this.login = this.login.bind(LoginController);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, password } = req.body;
      const loginResponse = await this.loginService.findUser({ user, password });
      if (loginResponse) {
        return res.status(StatusCodes.OK).json(loginResponse);
      }
    } catch (e) {
      next(e);
    }
  };

  public getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not exist' });
      }
      const user = await this.loginService.getUserByToken(authorization);

      return res.status(StatusCodes.OK).json({ user });
    } catch (e) {
      next(e);
    }
  };
}
