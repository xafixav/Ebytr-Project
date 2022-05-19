import { StatusCodes } from 'http-status-codes';
import ErrorExtension from '../utility/ErrorExtension';
import Tasks from '../database/models/Tasks';
import LoginService from './Login';

export default class TasksService {
  private static noTasksFound = 'No tasks has been found';

  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public findAll = async (token: string) => {
    const User = await this.loginService.getUserByToken(token);

    if (!User?.id) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: 'It is not possible to edit a task in which you are not the owner' });
    }

    const allTasks = await Tasks.findAll({ where: { userId: User.id }});

    if (!allTasks) {
      throw new ErrorExtension({ status: StatusCodes.NOT_FOUND,
        message: TasksService.noTasksFound });
    }

    return allTasks;
  };

  public createTask = async (data: ITask, token: string) => {
    const User = await this.loginService.getUserByToken(token);

    if (!User?.id) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: 'User not found or Token invalid' });
    }

    const createdTask = await Tasks.create(data);

    return createdTask;
  };

}