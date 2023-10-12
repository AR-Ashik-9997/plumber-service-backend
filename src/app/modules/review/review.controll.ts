import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Review } from '@prisma/client';
import { reviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;
  const result = await reviewService.createReview(reviewData);
  sendResponse<Review>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully',
    data: result,
  });
});
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllReview();
  sendResponse<Review[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review retrive successfully',
    data: result,
  });
});
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await reviewService.getSingleReview(id);
  sendResponse<Review>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Review retrived successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReview,
  getSingleReview,
};
