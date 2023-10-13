import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Product } from '@prisma/client';
import { productService } from './products.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const result = await productService.createProduct(productData);
  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created successfully',
    data: result,
  });
});
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllProduct();
  sendResponse<Product[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Products retrived successfully',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productService.getSingleProduct(id);
  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'single Product retrived successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...productData } = req.body;
  const result = await productService.updateProduct(id, productData);
  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productService.deleteProduct(id);
  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
