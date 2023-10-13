import { ProductReview } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createProductReview = async (
  payload: ProductReview
): Promise<ProductReview> => {
  const result = await prisma.productReview.create({ data: payload });
  return result;
};
const getAllProductReview = async (): Promise<ProductReview[]> => {
  const result = await prisma.productReview.findMany();
  return result;
};

export const productReviewService = {
  createProductReview,
  getAllProductReview,
};
