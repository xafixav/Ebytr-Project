import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import JwtService from './Jwt';
import ErrorExtension from '../utility/ErrorExtension';
import IUser from '../interfaces/IUser';

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

  public findUserById = async (id: number): Promise<IUser> => {
    const userPayload = await this.user.findOne({ where: { id } });

    if (!userPayload) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: 'Incorrect user or password' });
    }

    const userResponse = {
      id: userPayload.id,
      user: userPayload.user,
    };

    return userResponse;
  };

  public getUserByToken = async (token: string) => {
    try {
      const { user }: any = this.jwt.validateToken(token);

      const User = await this.user.findOne({ where: { user } });

      const response = {
        id: User?.id,
        User: User?.user,        
      };

      if (User) {
        return response;
      }
    } catch (e: any) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: e.message });
    }
  };
}
