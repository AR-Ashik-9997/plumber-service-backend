import { JwtPayload } from 'jsonwebtoken';
import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBlog = async (payload: Blog, user: JwtPayload): Promise<Blog> => {
  payload.userId = user?.userId;
  const result = await prisma.blog.create({ data: payload });
  return result;
};
const getAllblog = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany();
  return result;
};
const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const existingBlog = await prisma.blog.findFirst({ where: { id: id } });
  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  const result = await prisma.blog.findUnique({
    where: { id: existingBlog.id },
  });
  return result;
};
const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog> => {
  const existingblog = await prisma.blog.findFirst({ where: { id: id } });
  if (!existingblog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  const result = await prisma.blog.update({
    where: { id: existingblog.id },
    data: payload,
  });
  return result;
};
const deleteBlog = async (id: string): Promise<Blog> => {
  const existingblog = await prisma.blog.findFirst({ where: { id: id } });
  if (!existingblog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  const result = await prisma.blog.delete({
    where: { id: existingblog.id },
  });
  return result;
};

export const blogService = {
  createBlog,
  getAllblog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
