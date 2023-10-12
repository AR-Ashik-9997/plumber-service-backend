import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IServices } from './service.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createService = async (payload: IServices): Promise<Service> => {
  const result = await prisma.service.create({ data: payload });
  return result;
};
const getAllServices = async (): Promise<Service[]> => {
  const result = await prisma.service.findMany();
  return result;
};
const getSingleService = async (id: string): Promise<Service | null> => {
  const existingService = await prisma.service.findFirst({ where: { id: id } });
  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const result = await prisma.service.findUnique({
    where: { id: existingService.id },
  });
  return result;
};
const updateSingleService = async (
  id: string,
  payload: Partial<IServices>
): Promise<Service> => {
  const existingService = await prisma.service.findFirst({ where: { id: id } });
  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const result = await prisma.service.update({
    where: { id: existingService.id },
    data: payload,
  });
  return result;
};
const deleteService = async (id: string): Promise<Service> => {
  const existingService = await prisma.service.findFirst({ where: { id: id } });
  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.booking.deleteMany({ where: { serviceId: existingService.id } });
    await tx.review.deleteMany({ where: { serviceId: existingService.id } });
    const result = tx.service.delete({ where: { id: existingService.id } });
    return result;
  });
};
export const Services = {
  createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  deleteService,
};
