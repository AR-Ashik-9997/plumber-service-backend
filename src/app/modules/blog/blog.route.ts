import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import requestValidation from '../../middlewares/requestValidation';

const router = express.Router();

router.post(
  '/',
  requestValidation(blogValidation.createBlog),
  auth(ENUM_USER_ROLE.ADMIN),
  blogController.createBlog
);
router.get('/', blogController.getAllblog);
router.get('/:id', blogController.getSingleBlog);

router.patch(
  '/:id',
  requestValidation(blogValidation.updateBlog),
  auth(ENUM_USER_ROLE.ADMIN),
  blogController.updateBlog
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), blogController.deleteBlog);

export const BlogRoute = router;
