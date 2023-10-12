import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Feedback } from '@prisma/client';
import { feedbackService } from './feedback.service';

const createfeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;
  const result = await feedbackService.createfeedback(reviewData);
  sendResponse<Feedback>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback created successfully',
    data: result,
  });
});
const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackService.getAllFeedback();
  sendResponse<Feedback[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Feedback retrive successfully',
    data: result,
  });
});
const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await feedbackService.getSingleFeedback(id);
  sendResponse<Feedback>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Feedback retrived successfully',
    data: result,
  });
});
const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await feedbackService.deleteFeedback(id);
  sendResponse<Feedback>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const feedbackController = {
  createfeedback,
  getAllFeedback,
  getSingleFeedback,
  deleteFeedback,
};
