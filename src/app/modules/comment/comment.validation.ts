import { z } from 'zod';
const createComment = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    blogId: z.string({
      required_error: 'blogId is required',
    }),
    comment: z.string({
      required_error: 'comment is required',
    }),
  }),
});

export const commentValidation = {
  createComment,
};
