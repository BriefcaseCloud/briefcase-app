import {NextFunction, Request, Response, Router} from "express";

/**
 * / route
 *
 * @class AuthRoute
 */
export class ProjectsRoute {
    /**
     * Create the routes.
     *
     * @class AuthRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[ProjectsRoute::create] Creating Projects route.");

        //add get ids route
        router.get("/projects/", (req: Request, res: Response, next: NextFunction) => {
            new ProjectsRoute().projectsGet(req, res, next);
        });
        //add verify id route
        router.post("/projects/", (req: Request, res: Response, next: NextFunction) => {
            new ProjectsRoute().projectsPost(req, res, next);
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
    public projectsGet(req: Request, res: Response, next: NextFunction) {
        // Based on user id fetch appropriate projects -- TODO
        console.log("getting projects...");
        // req.body.user
        res
            .status(200)
            .jsonp([
                {ProjName: "project 1", UseCasesArray: ["click", "2", "3"], Selected: false},
                {ProjName: "project 2", UseCasesArray: ["1", "2", "3"], Selected: false}
                ])
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
    public projectsPost(req: Request, res: Response, next: NextFunction) {
        // add new projects to user db -- TODO

        res
            .status(200)
            .jsonp({
                success: true
            })
            .end();


    }
}
