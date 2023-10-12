import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBlogDetails } from './blog.interface';

const createBlog = async (
  blogDetails: IBlogDetails,
  blogData: Blog
): Promise<Blog> => {
  const result = await prisma.$transaction(async tx => {
    const newBlog = await tx.blog.create({ data: blogData });
    if (!newBlog) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'blog creation failed');
    }
    const newBlogDetails = await tx.blogDetails.create({ data: blogDetails });
    if (!newBlogDetails) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'blogDetails creation failed');
    }
    return newBlog;
  });
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
  blogDetails: Partial<IBlogDetails>,
  blogData: Partial<Blog>
): Promise<Blog> => {
  const existingblog = await prisma.blog.findFirst({ where: { id: id } });
  if (!existingblog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.blogDetails.updateMany({
      where: { blogId: existingblog.id },
      data: blogDetails,
    });
    const result = await tx.blog.update({
      where: { id: existingblog.id },
      data: blogData,
    });
    return result;
  });
};
const deleteBlog = async (id: string): Promise<Blog> => {
  const existingblog = await prisma.blog.findFirst({ where: { id: id } });
  if (!existingblog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  return await prisma.$transaction(async tx => {
    await tx.blogDetails.deleteMany({
      where: { blogId: existingblog.id },
    });
    const result = await tx.blog.delete({
      where: { id: existingblog.id },
    });
    return result;
  });
};

export const blogService = {
  createBlog,
  getAllblog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
