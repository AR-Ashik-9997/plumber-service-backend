import { Status } from '@prisma/client';
import { z } from 'zod';

const createBooking = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    time: z.string({
      required_error: 'time is required',
    }),
  }),
});
const updateBooking = z.object({
  body: z.object({
    status: z.enum([...Object.values(Status)] as [string, ...string[]], {
      required_error: 'status is required',
    }),
  }),
});

export const bookingValidation = {
  createBooking,
  updateBooking,
};
