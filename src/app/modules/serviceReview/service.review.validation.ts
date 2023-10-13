import { z } from 'zod';

const createReview = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    bookingId: z.string({
      required_error: 'bookingId is required',
    }),
    review: z.string({
      required_error: 'review is required',
    }),
    rating: z.string({
      required_error: 'rating is required',
    }),
  }),
});
const updateReview = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    bookingId: z.string().optional(),
    review: z.string().optional(),
    rating: z.string().optional(),
  }),
});

export const reviewValidation = {
  createReview,
  updateReview,
};
