import {Router} from "express";
import userRoutes from "./users-routes.js";
import articlesRoutes from "./articles-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/articles", articlesRoutes); //domain/api/v1/article

export default appRouter;