import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import { FileUploadHelper } from '../../../helpers/fileUploader';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = blogValidation.createBlog.parse(JSON.parse(req.body.data));
    return blogController.createBlog(req, res, next);
  }
);
router.get('/', blogController.getAllblog);
router.get('/:id', blogController.getSingleBlog);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = blogValidation.updateBlog.parse(JSON.parse(req.body.data));
    return blogController.updateBlog(req, res, next);
  }
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), blogController.deleteBlog);

export const BlogRoute = router;
