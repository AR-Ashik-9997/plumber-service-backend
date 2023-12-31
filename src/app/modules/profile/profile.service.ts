import { Profile } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';

const createProfile = async (
  payload: Profile,
  user: JwtPayload
): Promise<Profile> => {
  payload.userId = user?.userId;
  const result = await prisma.profile.create({ data: payload });
  return result;
};

const getSingleProfile = async (id: string): Promise<Profile | null> => {
  const existingProfile = await prisma.profile.findFirst({
    where: { userId: id },
  });
  if (!existingProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  const result = await prisma.profile.findUnique({
    where: {
      id: existingProfile.id,
    },
  });
  return result;
};
const updateSingleProfile = async (
  id: string,
  payload: Profile
): Promise<Profile> => {
  const existingProfile = await prisma.profile.findFirst({
    where: { userId: id },
  });
  if (!existingProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  if (payload.image !== undefined) {
    const result = await prisma.profile.update({
      where: {
        id: existingProfile.id,
      },
      data: payload,
    });
    return result;
  } else {
    const result = await prisma.profile.update({
      where: {
        id: existingProfile.id,
      },
      data: payload,
    });
    return result;
  }
};

export const ProfileService = {
  createProfile,
  getSingleProfile,
  updateSingleProfile,
};
