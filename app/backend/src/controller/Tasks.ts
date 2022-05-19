import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
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
}
