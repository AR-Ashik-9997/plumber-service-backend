import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { commentValidation } from './comment.validation';
import { commentController } from './comment.controller';

const router = express.Router();

router.post(
  '/',
  requestValidation(commentValidation.createComment),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  commentController.createBlogComment
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  commentController.getSingleComment
);

export const CommentRoute = router;
