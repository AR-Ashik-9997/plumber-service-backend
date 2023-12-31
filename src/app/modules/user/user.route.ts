import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

import requestValidation from '../../middlewares/requestValidation';
const router = express.Router();
router.post(
  '/',
  requestValidation(UserValidation.createUser),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);
router.post(
  '/create/admin',
  requestValidation(UserValidation.createAdmin),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.createAdmin
);
router.post(
  '/changepassword',
  requestValidation(UserValidation.changePassword),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.changePassword
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser
);
router.patch(
  '/:id',
  requestValidation(UserValidation.updateUser),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateSingleUser
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
