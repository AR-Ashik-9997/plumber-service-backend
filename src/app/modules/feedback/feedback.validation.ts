import { z } from 'zod';
const createFeedback = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    comment: z.string({
      required_error: 'comment is required',
    }),
  }),
});

export const feedbackValidation = {
  createFeedback,
};
