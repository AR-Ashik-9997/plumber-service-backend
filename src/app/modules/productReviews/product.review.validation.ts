import { z } from 'zod';
const createProductReview = z.object({
  body: z.object({
    productId: z.string({
      required_error: 'productId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
    userName: z.string({
      required_error: 'userName is required',
    }),
    review: z.string({
      required_error: 'review is required',
    }),
    rating: z.string({
      required_error: 'rating is required',
    }),
  }),
});
const updateProductReview = z.object({
  body: z.object({
    productId: z.string().optional(),
    userId: z.string().optional(),
    userName: z.string().optional(),
    review: z.string().optional(),
    rating: z.string().optional(),
  }),
});

export const productReviewValidation = {
  createProductReview,
  updateProductReview,
};
