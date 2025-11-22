import { tool } from "@langchain/core/tools";
import bookingController from "../../controllers/booking.controller.js";
import * as z from "zod";

const checkTicketAvilabilty = tool(
  async (input) => {
    // TODO
    const showId = parseInt(input.showId);
    const req = { params: { showId } };
    req.isAIRequest = true;
    const result = await bookingController.checkAvailability(req);
    return result;
  },
  {
    name: "checkTicketAvilabilty",
    description: "Check ticket availability for a givven show id",
    schema: z.object({
      showId: z
        .string()
        .describe("The city or location to get the weather for"),
    }),
  }
);

const lockSeat = tool(
  async (input) => {
    const showId = parseInt(input.showId);
    const seatIds = input.seatIds.map((id) => parseInt(id));

    const req = { body: { showId, seatIds } };
    req.isAIRequest = true;

    const result = await bookingController.lockSeats(req);
    return result;
  },
  {
    name: "lockSeat",
    description: "Lock specific seats for a given show ID before booking.",
    schema: z.object({
      showId: z.string().describe("The show ID for which to lock seats"),
      seatIds: z
        .array(z.string())
        .describe("List of seat IDs to be locked for the show"),
    }),
  }
);

const bookingTools = { checkTicketAvilabilty, lockSeat };
export default bookingTools;
