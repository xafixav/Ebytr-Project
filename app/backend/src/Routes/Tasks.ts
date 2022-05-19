import * as express from 'express';
import tasks from '../controller/Tasks';

const TasksController = new tasks();

const router = express.Router();

router
  .route('/tasks')
  .get(
    TasksController.findAll,
  );

export default router;
