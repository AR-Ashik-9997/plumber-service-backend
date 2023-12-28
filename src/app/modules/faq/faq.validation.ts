import { z } from 'zod';

const updateFaq = z.object({
  body: z.object({
    list: z.array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
    ),
  }),
});

export const faqValidation = {
  updateFaq,
};
