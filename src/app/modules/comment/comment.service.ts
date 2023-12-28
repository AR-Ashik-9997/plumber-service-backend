import { Comment } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createBlogComment = async (payload: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({ data: payload });
  return result;
};
const getSingleComment = async (id: string): Promise<Comment[]> => {
  const existingComment = await prisma.comment.findFirst({
    where: { blogId: id },
  });
  if (!existingComment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'comment not found');
  }

  const result = await prisma.comment.findMany({
    where: { blogId: existingComment.blogId },
  });
  return result;
};

export const commentService = {
  createBlogComment,
  getSingleComment,
};
