import { z } from 'zod';

const createBlog = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    username: z.string({
      required_error: 'username is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),
    title: z.string({
      required_error: 'title is required',
    }),
  }),
  blogDetails: z.object({
    blogId: z.string({
      required_error: 'blogId is required',
    }),
    banner: z.string({
      required_error: 'banner image is required',
    }),
    details: z.array(
      z.string({
        required_error: 'details array is required',
      })
    ),
  }),
});
const updateBlog = z.object({
  body: z.object({
    userId: z.string().optional(),
    username: z.string().optional(),
    image: z.string().optional(),
    title: z.string().optional(),
  }),
  blogDetails: z
    .object({
      blogId: z.string().optional(),
      banner: z.string().optional(),
      details: z.array(z.string().optional()).optional(),
    })
    .optional(),
});

export const blogValidation = {
  createBlog,
  updateBlog,
};
