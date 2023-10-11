import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import requestValidation from '../../middlewares/requestValidation';
import { profileValidation } from './profile.validation';
const router = express.Router();

router.post(
  '/',
  requestValidation(profileValidation.createProfile),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ProfileController.createProfile
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
