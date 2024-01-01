import { z } from 'zod';

const CreateFaq = z.object({
  body: z.object({
    list: z.array(
      z.object({
        title1: z.string({ required_error: 'title1 is required' }),
        description1: z.string({ required_error: 'description1 is required' }),
        title2: z.string({ required_error: 'title2 is required' }),
        description2: z.string({ required_error: 'description2 is required' }),
        title3: z.string({ required_error: 'title3 is required' }),
        description3: z.string({ required_error: 'description3 is required' }),
        title4: z.string({ required_error: 'title4 is required' }),
        description4: z.string({ required_error: 'description4 is required' }),
        title5: z.string({ required_error: 'title5 is required' }),
        description5: z.string({ required_error: 'description5 is required' }),
        title6: z.string({ required_error: 'title6 is required' }),
        description6: z.string({ required_error: 'description6 is required' }),
      })
    ),
  }),
});
const updateFaq = z.object({
  body: z.object({
    list: z
      .array(
        z.object({
          title1: z.string().optional(),
          description1: z.string().optional(),
          title2: z.string().optional(),
          description2: z.string().optional(),
          title3: z.string().optional(),
          description3: z.string().optional(),
          title4: z.string().optional(),
          description4: z.string().optional(),
          title5: z.string().optional(),
          description5: z.string().optional(),
          title6: z.string().optional(),
          description6: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const faqValidation = {
  CreateFaq,
  updateFaq,
};
