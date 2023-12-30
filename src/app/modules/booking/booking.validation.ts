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
    date: z.string().optional(),
    time: z.string().optional(),
    status: z
      .enum([...Object.values(Status)] as [string, ...string[]])
      .optional(),
  }),
});

export const bookingValidation = {
  createBooking,
  updateBooking,
};
