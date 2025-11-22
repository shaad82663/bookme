import { z } from "zod";

const seatSchema = z.object({
  id: z.number(),
  screenId: z.number(),
  seatNumber: z.string(),
  type: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const seatArraySchema = z.array(seatSchema);

const checkAvailabilityInputSchema = z.object({
  showId: z.string().describe("The show ID to check ticket availability for"),
});

const lockSeatInputSchema = z.object({
  showId: z.string().describe("The show ID for which to lock seats"),
  seatIds: z.array(z.string()).describe("List of seat IDs to lock"),
});

const seatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: seatArraySchema.optional(),
});

const bookingSchemas = {
  checkTicketAvilabilty: {
    input: checkAvailabilityInputSchema,
    response: seatResponseSchema,
  },
  lockSeat: {
    input: lockSeatInputSchema,
    response: seatResponseSchema,
  },
};

export default bookingSchemas;
