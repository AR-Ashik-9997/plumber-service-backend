import { Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IFaq } from './faq.interface';

const createFaq = async (payload: IFaq): Promise<Faq> => {
  const result = await prisma.faq.create({ data: payload });
  return result;
};
const getFaq = async (): Promise<Faq[]> => {
  const result = await prisma.faq.findMany();
  return result;
};
const updateFaq = async (id: string, payload: Partial<IFaq>): Promise<Faq> => {
  const result = await prisma.faq.update({ where: { id: id }, data: payload });
  return result;
};
export const faqService = {
  createFaq,
  getFaq,
  updateFaq,
};
