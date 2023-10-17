import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import requestValidation from '../../middlewares/requestValidation';
import { profileValidation } from './profile.validation';
import { FileUploadHelper } from '../../../helpers/fileUploader';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = profileValidation.createProfile.parse(JSON.parse(req.body.data));
    return ProfileController.createProfile(req, res, next);
  }
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ProfileController.getSingleProfile
);

router.patch(
  '/:id',
  requestValidation(profileValidation.updateProfile),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ProfileController.updateSingleProfile
);

export const ProfileRoute = router;
