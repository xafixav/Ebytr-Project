import { StatusCodes } from 'http-status-codes';
import ErrorExtension from '../utility/ErrorExtension';
import Tasks from '../database/models/Tasks';
import LoginService from './Login';
import IUpdateTask from '../interfaces/IUpdateTask';
import ITask from '../interfaces/ITask';

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

    data.userId = User.id;

    const createdTask = await Tasks.create(data);

    return createdTask;
  };

  public updateTask = async (data: IUpdateTask) => {
    const { id, task, status, token } = data;
    const taskSelected = await Tasks.findOne({ where: { id } });
    if (!taskSelected) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: TasksService.noTasksFound });
    }
    const User = await this.loginService.getUserByToken(token);
    this.validateOwner(User?.id, taskSelected.userId);
    const TaskUpdated = await Tasks.update({
      task,
      status,
    }, {
      where: { id },
    });
    return TaskUpdated;
  };

  private validateOwner = async (UserId: number|undefined, taskId: number) => {
    if (!UserId || !taskId) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: 'It is not possible to edit a task in which you are not the owner' });
    }

    const { id: ownerId } = await this.loginService.findUserById(UserId);

    const { userId }: any = await Tasks.findOne({ where: { id: taskId } });

    if (ownerId !== userId) {
      throw new ErrorExtension({ status: StatusCodes.UNAUTHORIZED,
        message: 'It is not possible to edit a task in which you are not the owner' });
    }
  };

}