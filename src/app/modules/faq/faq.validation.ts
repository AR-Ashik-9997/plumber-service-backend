import { z } from 'zod';

const createFaq = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    list: z.array(
      z.object({
        title: z.string({
          required_error: 'title is required',
        }),
        description: z.string({
          required_error: 'description is required',
        }),
      })
    ),
  }),
});
const updateFaq = z.object({
  body: z.object({
    userId: z.string().optional(),
    list: z.array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
    ),
  }),
});

export const faqValidation = {
  createFaq,
  updateFaq,
};
