import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createBooking = async (payload: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({ data: payload });
  return result;
};
const getAllbooking = async (user: JwtPayload): Promise<Booking[]> => {
  const { userId, role } = user;
  if (role === 'user') {
    const existingBookings = await prisma.booking.findFirst({
      where: { userId: userId },
    });
    if (!existingBookings) {
      throw new ApiError(httpStatus.NOT_FOUND, 'booking service not found');
    }
    const result = await prisma.booking.findMany({
      where: { userId: userId },
      include: {
        service: {
          select: {
            title: true,
            image: true,
          },
        },
        ServiceReview: true,
      },
    });
    return result;
  } else {
    const result = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            title: true,
            image: true,
          },
        },
      },
    });
    return result;
  }
};
const getSingleBooking = async (
  id: string,
  user: JwtPayload
): Promise<Booking | null> => {
  const { userId, role } = user;
  if (role === 'user') {
    const existingBooking = await prisma.booking.findFirst({
      where: { userId: userId, id: id },
    });
    if (!existingBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking service not found');
    }
    const result = await prisma.booking.findUnique({
      where: { id: existingBooking.id },
      include: {
        service: {
          select: {
            title: true,
            image: true,
          },
        },
        ServiceReview: true,
      },
    });
    return result;
  } else {
    const existingBooking = await prisma.booking.findFirst({
      where: { id: id },
    });
    if (!existingBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking service not found');
    }
    const result = await prisma.booking.findUnique({
      where: { id: existingBooking.id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            title: true,
            image: true,
          },
        },
      },
    });
    return result;
  }
};
const updateBooking = async (
  id: string,
  user: JwtPayload,
  payload: Booking
): Promise<Booking> => {
  const { role, userId } = user;
  if (role === 'user') {
    const existingBooking = await prisma.booking.findFirst({
      where: { userId: userId, id: id },
    });
    if (!existingBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking service not found');
    }
    const result = await prisma.booking.update({
      where: { id: existingBooking.id },
      data: { date: payload.date, time: payload.time },
    });
    return result;
  } else {
    const existingBooking = await prisma.booking.findFirst({
      where: { id: id },
    });
    if (!existingBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking service not found');
    }
    const result = await prisma.booking.update({
      where: { id: existingBooking.id },
      data: { date: payload.date, time: payload.time, status: payload.status },
    });
    return result;
  }
};

const deleteBooking = async (
  id: string,
  user: JwtPayload
): Promise<Booking> => {
  const { role, userId } = user;
  if (role === 'user') {
    const existingBooking = await prisma.booking.findFirst({
      where: { userId: userId, id: id },
    });
    if (!existingBooking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking service not found');
    }
    const result = await prisma.booking.delete({
      where: { id: existingBooking.id },
    });
    return result;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
  }
};

export const bookingService = {
  createBooking,
  getAllbooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
