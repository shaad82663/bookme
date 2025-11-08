import * as Yup from "yup";
import Show from "../models/Show";
import { BadRequestError, ValidationError } from "../utils/ApiError";

const showController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        movieId: Yup.number().required(),
        screenId: Yup.number().required(),
        startTime: Yup.date().required(),
        endTime: Yup.date().required(),
      });
      if (!(await schema.isValid(req.body))) throw new ValidationError();
      if (new Date(req.body.endTime) <= new Date(req.body.startTime))
        throw new BadRequestError("Invalid times");
      const show = await Show.create(req.body);
      return res.status(201).json(show);
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { movieId, theaterId, date } = req.query;
      const where = {};
      if (movieId) where.movieId = movieId;

      const shows = await Show.findAll({
        where,
        include: [
          { model: "Screen", where: theaterId ? { theaterId } : undefined },
        ],
      });
      return res.status(200).json(shows);
    } catch (error) {
      next(error);
    }
  },
};

export default showController;
