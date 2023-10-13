import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProductReview } from '@prisma/client';
import { productReviewService } from './product.review.service';

const createProductReview = catchAsync(async (req: Request, res: Response) => {
  const { ...productReviewData } = req.body;
  const result = await productReviewService.createProductReview(
    productReviewData
  );
  sendResponse<ProductReview>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Review created successfully',
    data: result,
  });
});
const getAllProductReview = catchAsync(async (req: Request, res: Response) => {
  const result = await productReviewService.getAllProductReview();
  sendResponse<ProductReview[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Product Review retrive successfully',
    data: result,
  });
});

export const productReviewController = {
  createProductReview,
  getAllProductReview,
};
