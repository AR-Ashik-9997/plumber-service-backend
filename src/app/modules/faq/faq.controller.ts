import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Faq } from '@prisma/client';
import { faqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const { ...faqData } = req.body;
  const result = await faqService.createFaq(faqData);
  sendResponse<Faq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Frequently Ask Question created successfully',
    data: result,
  });
});
const getFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.getFaq();
  sendResponse<Faq[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Frequently Ask Question retrived successfully',
    data: result,
  });
});
const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...faqData } = req.body;
  const result = await faqService.updateFaq(id, faqData);
  sendResponse<Faq>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Frequently Ask Question updated successfully',
    data: result,
  });
});

export const faqController = {
  createFaq,
  getFaq,
  updateFaq,
};
