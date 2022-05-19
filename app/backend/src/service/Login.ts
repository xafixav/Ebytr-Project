import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import JwtService from './Jwt';
import ErrorExtension from '../utility/ErrorExtension';

export default class LoginService {
  jwt: JwtService;

  private user;

  constructor() {
    this.jwt = new JwtService();
    this.user = Users;
  }

  public findUser = async (data: ILogin): Promise<ILoginResponse> => {
    const { user } = data;
    const userPayload = await this.user.findOne({ where: { user } });

    if (!userPayload) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: 'Incorrect user or password' });
    }

    const userResponse = {
      id: userPayload.id,
      user: userPayload.user,
    };

    return {
      user: userResponse,
      token: this.jwt.generateToken(data),
    };
  };
}
