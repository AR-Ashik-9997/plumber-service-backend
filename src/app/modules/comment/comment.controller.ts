import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Comment } from '@prisma/client';
import { commentService } from './comment.service';

const createBlogComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const result = await commentService.createBlogComment(commentData);
  sendResponse<Comment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment created successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await commentService.getSingleComment(id);
  sendResponse<Comment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Comments retrived successfully',
    data: result,
  });
});

export const commentController = {
  createBlogComment,
  getSingleComment,
};
