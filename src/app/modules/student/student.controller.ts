import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { studentService } from './student.service';
import { User } from '@prisma/client';


const createTest = catchAsync(async (req: Request, res: Response) => {
  const { ...testData } = req.body;
  const result = await studentService.createTest(testData);
  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: result,
  });
});

export const studentController = {
 
  createTest
};
