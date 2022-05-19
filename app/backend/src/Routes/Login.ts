import * as express from 'express';
import LoginController from '../controller/Login';
import LoginMiddleware from '../middleware/Login';

const { login } = new LoginController();
const { loginIsValid } = new LoginMiddleware();

const router = express.Router();

router
  .route('/login')
  .post(
    loginIsValid,
    login,
  );

export default router;
