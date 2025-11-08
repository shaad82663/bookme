import { Router } from "express";
import movieController from "../controllers/movie.controller";

const movieRoutes = Router();
movieRoutes.post("/movies", movieController.add);
movieRoutes.get("/movies", movieController.get);

export { movieRoutes };
