import bodyParser from "body-parser";
import express from "express";
import { IndexRoute } from "./routes/index";
import { AuthRoute } from "./routes/auth";
import cors from 'cors';

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:8080",
    preflightContinue: false
};

/**
 * The server.
 *
 * @class Server
 */
export class Router {
  /**
   * Create and return Router.
   *
   * @class Router
   * @method init
   * @param {express.Application} app
   * @return {express.Router}
   */
  public static init(app: express.Application) {
    let router: express.Router;

    router = express.Router();
    router.use(cors(options));

    this.create(router)

    //use router middleware
    app.use(router);

    return router
  }

  /**
   * Create routes
   * 
   * @class Router
   * @method create
   * @param {express.Router} router
   * @return undefined
   */
  private static create(router: express.Router) {
    IndexRoute.create(router);
    AuthRoute.create(router);
  }
}
