// src/routes/query.routes.js
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import bookingAgent from "../ai/agents/booking.js";
import schemas from "../ai/schema/index.js";
const queryRoutes = Router();
const bookingSchemas = schemas.bookingSchemas; // temporary assignment for demonstration

const getResult = (response) => {
  if (response.length === 1) {
    const singleResult = response[0];
    const { result } = singleResult;
    return result;
  }
  const finalResults = [];
  for (const resItem of response) {
    const { result } = resItem;
    finalResults.push(result);
  }
  return finalResults;
};

queryRoutes.post("/query", authMiddleware, async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = (await bookingAgent.callModel(prompt)) || [];
    const finalResults = getResult(response);
    return res.status(200).json({ success: true, data: finalResults });
  } catch (error) {
    next(error);
  }
});

export { queryRoutes };
