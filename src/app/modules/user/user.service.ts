/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Profile, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IChangePassword, UserWithoutPassword } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { JwtPayload } from 'jsonwebtoken';

const createUser = async (profile: Profile, payload: User): Promise<User> => {
  const result = await prisma.$transaction(async tx => {
    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User email already exists');
    }
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bycrypt_salt_rounds)
    );
    payload.role = 'user';
    const newUser = await tx.user.create({ data: payload });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'user creation failed');
    }
    profile.userId = newUser.id;
    profile.username = newUser.name;
    const newProfile = await tx.profile.create({ data: profile });
    if (!newProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'profile creation failed');
    }
    return newUser;
  });
  return result;
};
const createAdmin = async (profile: Profile, payload: User): Promise<User> => {
  const result = await prisma.$transaction(async tx => {
    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'user email already exists');
    }
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bycrypt_salt_rounds)
    );
    const newUser = await tx.user.create({ data: payload });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'admin creation failed');
    }
    profile.userId = newUser.id;
    profile.username = newUser.name;
    const newProfile = await tx.profile.create({ data: profile });
    if (!newProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'profile creation failed');
    }
    return newUser;
  });
  return result;
};

const getAllUsers = async (
  user: JwtPayload
): Promise<UserWithoutPassword[]> => {
  if (user?.role === 'admin') {
    const result = await prisma.user.findMany({
      where: { OR: [{ role: 'user' }, { role: 'admin' }] },
    });
    const usersWithoutPassword: UserWithoutPassword[] = result.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }
  const result = await prisma.user.findMany();
  const usersWithoutPassword: UserWithoutPassword[] = result.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  return usersWithoutPassword;
};

const getSingleUser = async (
  id: string
): Promise<UserWithoutPassword | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: { Profile: true },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

const updateSingleUser = async (
  id: string,
  profile: Partial<Profile>,
  payload: Partial<User>
): Promise<UserWithoutPassword> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await prisma.$transaction(async tx => {
    const newUser = await tx.user.update({
      where: { id: id },
      data: payload,
      include: { Profile: true },
    });
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'user update failed');
    }
    if (profile.image !== undefined) {
      profile.username = newUser.name;
      const newProfile = await tx.profile.updateMany({
        where: { userId: newUser.id },
        data: profile,
      });
      if (!newProfile) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'profile update failed');
      }
    }
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.profile.deleteMany({ where: { userId: id } });
    const result = await tx.user.delete({
      where: { id },
    });
    return result;
  });
};

const changePassword = async (payload: IChangePassword, user: JwtPayload) => {
  const { userId } = user;
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (!(await bcrypt.compare(payload.oldpassword, existingUser.password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old password is incorrect');
  }
  payload.newpassword = await bcrypt.hash(
    payload.newpassword,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      password: payload.newpassword,
    },
  });
  return result;
};
export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createUser,
  createAdmin,
  changePassword,
};
