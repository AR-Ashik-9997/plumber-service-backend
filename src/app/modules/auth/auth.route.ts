import express from 'express';
import requestValidation from '../../middlewares/requestValidation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  requestValidation(AuthValidation.createUser),
  AuthController.createUser
);
router.post(
  '/signin',
  requestValidation(AuthValidation.loginUser),
  AuthController.LoginUser
);

export const AuthRoute = router;
