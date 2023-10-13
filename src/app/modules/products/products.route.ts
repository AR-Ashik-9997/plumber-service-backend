import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import requestValidation from '../../middlewares/requestValidation';
import { productValidation } from './products.validation';
import { productController } from './products.controller';

const router = express.Router();

router.post(
  '/',
  requestValidation(productValidation.createProduct),
  auth(ENUM_USER_ROLE.ADMIN),
  productController.createProduct
);
router.get('/', productController.getAllProduct);
router.get('/:id', productController.getSingleProduct);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  productController.deleteProduct
);

export const ProductRoute = router;
