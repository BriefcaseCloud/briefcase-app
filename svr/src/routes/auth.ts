import { NextFunction, Request, Response, Router } from "express";

/**
 * / route
 *
 * @class AuthRoute
 */
export class AuthRoute  {
  /**
   * Create the routes.
   *
   * @class AuthRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[AuthRoute::create] Creating index route.");

    //add get ids route
    router.get("/auth/", (req: Request, res: Response, next: NextFunction) => {
      new AuthRoute().indexGet(req, res, next);
    });
    //add verify id route
    router.post("/auth/", (req: Request, res: Response, next: NextFunction) => {
      new AuthRoute().indexPost(req, res, next);
    });
  }

  /**
   * The home page route.
   *
   * @class AuthRoute
   * @method indexGet
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  public indexGet(req: Request, res: Response, next: NextFunction) {
    res
      .status(200)
      .jsonp([1234, 2345, 3456, 4567, 5678, 6789])
      .end();
  }

  /**
   * The home page route.
   *
   * @class AuthRoute
   * @method indexPost
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @param next {NextFunction} Execute the next method.
   */
  public indexPost(req: Request, res: Response, next: NextFunction) {
    res
      .status(200)
      .jsonp({
        success: true
      })
      .end();
  }
}
