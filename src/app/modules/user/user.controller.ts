import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { UserWithoutPassword } from './user.interface';
import { IUploadFile } from '../../../shared/files';
import { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { profile, ...userData } = req.body;
  const file = req.file as IUploadFile;
  await UserService.createUser(profile, userData, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { profile, ...userData } = req.body;
  const file = req.file as IUploadFile;
  await UserService.createAdmin(profile, userData, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully',
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const result = await UserService.getAllUsers(user);
  sendResponse<UserWithoutPassword[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse<UserWithoutPassword>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User getched successfully',
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { profile, ...userData } = req.body;
  const file = req.file as IUploadFile;
  const result = await UserService.updateSingleUser(
    id,
    profile,
    userData,
    file
  );
  sendResponse<UserWithoutPassword>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user!;

  const result = await UserService.changePassword(passwordData, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password Change successfully',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteSingleUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Uers deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createAdmin,
  changePassword,
};
