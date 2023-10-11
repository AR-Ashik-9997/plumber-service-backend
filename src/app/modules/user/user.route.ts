import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/',
  requestValidation(UserValidation.createUser),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  requestValidation(UserValidation.updateUser),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
