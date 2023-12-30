import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Booking } from '@prisma/client';
import { bookingService } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...bookingData } = req.body;
  const result = await bookingService.createBooking(bookingData);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});
const getAllbooking = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const result = await bookingService.getAllbooking(user);
  sendResponse<Booking[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Booking retrived successfully',
    data: result,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user: JwtPayload = req.user!;
  const result = await bookingService.getSingleBooking(id, user);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Booking retrived successfully',
    data: result,
  });
});
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user: JwtPayload = req.user!;
  const { ...bookingData } = req.body;
  const result = await bookingService.updateBooking(id, user, bookingData);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking status updated successfully',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user: JwtPayload = req.user!;
  const result = await bookingService.deleteBooking(id, user);
  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllbooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
