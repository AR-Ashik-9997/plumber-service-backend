import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Blog } from '@prisma/client';
import { blogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;
  const user: JwtPayload = req.user!;
  const result = await blogService.createBlog(blogData, user);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog post successfully',
    data: result,
  });
});
const getAllblog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllblog();
  sendResponse<Blog[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All blog retrived successfully',
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.getSingleBlog(id);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single blog retrived successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...blogData } = req.body;
  const result = await blogService.updateBlog(id, blogData);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogService.deleteBlog(id);
  sendResponse<Blog>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const blogController = {
  createBlog,
  getAllblog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
