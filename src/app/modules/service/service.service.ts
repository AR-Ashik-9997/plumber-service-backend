/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../shared/prisma';
import { IServiceSearchFilter, IServices } from './service.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { ServiceSearchableFields } from './service.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { Prisma, Service } from '@prisma/client';

const createService = async (payload: IServices): Promise<Service> => {
  const newService = await prisma.service.create({ data: payload });
  if (!newService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service creation failed');
  }
  return newService;
};
const getAllServices = async (
  filters: IServiceSearchFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { search, ...filtersData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: ServiceSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (key === 'maxPrice') {
          return {
            price: {
              gte: filtersData[key] as any,
            },
          };
        } else if (key === 'minPrice') {
          return {
            price: {
              lte: filtersData[key] as any,
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const result = await prisma.service.findMany({
    where: whereConditions,
    include: { ServiceReview: true },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            price: 'asc',
          },
  });

  const total = await prisma.service.count();
  const totalPages = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPages,
    },
    data: result,
  };
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
  serviceData: Partial<IServices>
): Promise<Service> => {
  const existingService = await prisma.service.findFirst({ where: { id: id } });
  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const result = await prisma.$transaction(async tx => {
    if (serviceData.image != undefined) {
      const newService = await tx.service.update({
        where: { id: existingService.id },
        data: serviceData,
      });
      return newService;
    }
    const newService = await tx.service.update({
      where: { id: existingService.id },
      data: serviceData,
    });
    return newService;
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
    await tx.serviceReview.deleteMany({
      where: { serviceId: existingService.id },
    });
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
