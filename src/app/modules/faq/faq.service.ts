import { Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IFaq } from './faq.interface';

const getFaq = async (): Promise<Faq[]> => {
  const result = await prisma.faq.findMany();
  return result;
};
const updateFaq = async (id: string, payload: Partial<IFaq>): Promise<Faq> => {
  const existingFaq = await prisma.faq.findFirst({
    where: { id: id },
  });
  if (!existingFaq) {
    throw new Error('Frequently Ask Question not found');
  }
  const result = await prisma.faq.update({ where: { id: id }, data: payload });
  return result;
};
export const faqService = {
  getFaq,
  updateFaq,
};
