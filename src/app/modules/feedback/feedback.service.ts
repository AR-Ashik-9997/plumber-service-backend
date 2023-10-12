import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createfeedback = async (payload: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({ data: payload });
  return result;
};
const getAllFeedback = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany();
  return result;
};
const getSingleFeedback = async (id: string): Promise<Feedback | null> => {
  const existingFeedback = await prisma.feedback.findFirst({
    where: { id: id },
  });
  if (!existingFeedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'feedback not found');
  }

  const result = await prisma.feedback.findUnique({
    where: { id: existingFeedback.id },
  });
  return result;
};
const deleteFeedback = async (id: string): Promise<Feedback> => {
  const existingFeedback = await prisma.feedback.findFirst({
    where: { id: id },
  });
  if (!existingFeedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'feedback not found');
  }

  const result = await prisma.feedback.delete({
    where: { id: existingFeedback.id },
  });
  return result;
};

export const feedbackService = {
  createfeedback,
  getAllFeedback,
  getSingleFeedback,
  deleteFeedback,
};
