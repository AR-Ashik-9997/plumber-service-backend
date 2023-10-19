import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Services } from './service.service';
import { Service } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ServiceFilterableFields } from './service.constant';
import { IUploadFile } from '../../../shared/files';

const createService = catchAsync(async (req: Request, res: Response) => {
  const { serviceDetails, ...serviceData } = req.body;
  const file = req.file as IUploadFile;
  const result = await Services.createService(
    serviceDetails,
    serviceData,
    file
  );
  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'service created successfully',
    data: result,
  });
});
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ServiceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await Services.getAllServices(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All service retrived successfully',
    meta: result.meta,
    data: result.data,
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
  const { serviceDetails, ...serviceData } = req.body;
  const file = req.file as IUploadFile;
  const result = await Services.updateSingleService(
    id,
    serviceData,
    serviceDetails,
    file
  );
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
