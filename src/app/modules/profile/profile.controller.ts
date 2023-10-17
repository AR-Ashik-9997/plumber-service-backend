import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';
import { Profile } from '@prisma/client';
import { IUploadFile } from '../../../shared/files';
import { JwtPayload } from 'jsonwebtoken';

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const { ...profileData } = req.body;
  const user: JwtPayload = req.user!;
  const file = req.file as IUploadFile;
  const result = await ProfileService.createProfile(profileData, file, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile created successfully',
    data: result,
  });
});

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProfileService.getSingleProfile(id);
  sendResponse<Profile>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});
const updateSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const result = await ProfileService.updateSingleProfile(id, updateData);
  sendResponse<Profile>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  createProfile,
  getSingleProfile,
  updateSingleProfile,
};
