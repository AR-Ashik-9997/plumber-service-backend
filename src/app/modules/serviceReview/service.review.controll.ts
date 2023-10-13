import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ServiceReview } from '@prisma/client';
import { reviewService } from './service.review.service';

const createServiceReview = catchAsync(async (req: Request, res: Response) => {
  const { ...ServiceReviewData } = req.body;
  const result = await reviewService.createServiceReview(ServiceReviewData);
  sendResponse<ServiceReview>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'ServiceReview created successfully',
    data: result,
  });
});
const getAllServiceReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllServiceReview();
  sendResponse<ServiceReview[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'ServiceReview retrive successfully',
    data: result,
  });
});
const getSingleServiceReview = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await reviewService.getSingleServiceReview(id);
    sendResponse<ServiceReview>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single ServiceReview retrived successfully',
      data: result,
    });
  }
);

export const ServiceReviewController = {
  createServiceReview,
  getAllServiceReview,
  getSingleServiceReview,
};
