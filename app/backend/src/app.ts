import * as express from 'express';
import ErrorHandler from './middleware/ErrorHandler';
import LoginRouter from './Routes/Login';

class App {
  public app: express.Express = express();

  private LoginRoutes: express.Router;

  constructor() {
    this.config();
    this.LoginRoutes = LoginRouter;
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  public apiMethods() {
    const { LoginRoutes } = this;
    this.app.use(LoginRoutes);
    this.app.use(ErrorHandler.ErrorReport);
  }

  public start(PORT: string | number):void {
    this.app.listen(Number(PORT), () => console.log(`Servidor ouvindo na PORTA: ${PORT}`));
    this.apiMethods();
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
const testClass = new App();

testClass.apiMethods();

export const { app } = testClass;
