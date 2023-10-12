import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Services } from './service.service';
import { Service } from '@prisma/client';

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;
  const result = await Services.createService(serviceData);
  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'service created successfully',
    data: result,
  });
});
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.getAllServices();
  sendResponse<Service[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All service retrived successfully',
    data: result,
  });
});
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.getSingleService(id);
  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single service retrived successfully',
    data: result,
  });
});
const updateSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...serviceData } = req.body;
  const result = await Services.updateSingleService(id, serviceData);
  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'service updated successfully',
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Services.deleteService(id);
  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'service deleted successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  deleteService,
};
