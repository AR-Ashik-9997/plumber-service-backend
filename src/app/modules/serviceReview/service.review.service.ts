import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ServiceReview } from '@prisma/client';

const createServiceReview = async (
  payload: ServiceReview
): Promise<ServiceReview> => {
  const result = await prisma.serviceReview.create({ data: payload });
  return result;
};

const getAllServiceReview = async (): Promise<ServiceReview[]> => {
  const result = await prisma.serviceReview.findMany();
  return result;
};
const getSingleServiceReview = async (
  id: string
): Promise<ServiceReview | null> => {
  const existingReview = await prisma.serviceReview.findFirst({
    where: { id },
  });
  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const result = await prisma.serviceReview.findUnique({
    where: { id: existingReview.id },
  });
  return result;
};

export const reviewService = {
  createServiceReview,
  getAllServiceReview,
  getSingleServiceReview,
};
