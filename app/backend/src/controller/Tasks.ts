import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUpdateTask from '../interfaces/IUpdateTask';
import TasksService from '../service/Tasks';

export default class MatchesController {
  private TasksService: TasksService;

  constructor() {
    this.TasksService = new TasksService();
  }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization: token } = req.headers;
      if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not exist' });
      }
      const allTasks = await this.TasksService.findAll(token);
      return res.status(StatusCodes.OK).json(allTasks);
    } catch (e) {
      next(e);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { task, status } = req.body;
      const { authorization: token } = req.headers;
      
      if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not exist' });
      }

      const matchesFiltered = await this.TasksService
        .createTask({ task, status }, token);
      return res.status(StatusCodes.CREATED).json(matchesFiltered);
    } catch (e) {
      next(e);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, task, status: taskStatus } = req.body;
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not exist' });
      }

      const updateRequest: IUpdateTask = {
        id: +id,
        task,
        status: taskStatus,
        token: authorization,
      };
      const matchUpdated = await this.TasksService.updateTask(updateRequest);
      return res.status(StatusCodes.OK).json(matchUpdated);
    } catch (e) {
      next(e);
    }
  };
}
