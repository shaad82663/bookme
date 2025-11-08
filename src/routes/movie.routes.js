import { Router } from "express";
import movieController from "../controllers/movie.controller";
// import authMiddleware from '../middlewares/auth.middleware'; // For admin

const movieRoutes = Router();
movieRoutes.post("/movies", movieController.add); // Admin
movieRoutes.get("/movies", movieController.get);

export { movieRoutes };
