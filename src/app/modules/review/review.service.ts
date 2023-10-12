import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createReview = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({ data: payload });
  return result;
};

const getAllReview = async (): Promise<Review[]> => {
  const result = await prisma.review.findMany();
  return result;
};
const getSingleReview = async (id: string): Promise<Review | null> => {
  const existingReview = await prisma.review.findFirst({ where: { id } });
  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const result = await prisma.review.findUnique({
    where: { id: existingReview.id },
  });
  return result;
};

export const reviewService = {
  createReview,
  getAllReview,
  getSingleReview,
};
