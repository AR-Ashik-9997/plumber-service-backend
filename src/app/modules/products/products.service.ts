import { Product } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProducts } from './products.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createProduct = async (payload: IProducts): Promise<Product> => {
  const result = await prisma.product.create({ data: payload });
  return result;
};
const getAllProduct = async (): Promise<Product[]> => {
  const result = await prisma.product.findMany();
  return result;
};
const getSingleProduct = async (id: string): Promise<Product | null> => {
  const existingProduct = await prisma.product.findFirst({ where: { id: id } });
  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await prisma.product.findUnique({
    where: { id: existingProduct.id },
    include: { ProductReview: true },
  });
  return result;
};
const updateProduct = async (
  id: string,
  payload: Partial<IProducts>
): Promise<Product> => {
  const existingProduct = await prisma.product.findFirst({ where: { id: id } });
  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await prisma.product.update({
    where: { id: existingProduct.id },
    data: payload,
  });
  return result;
};
const deleteProduct = async (id: string): Promise<Product> => {
  const existingProduct = await prisma.product.findFirst({ where: { id: id } });
  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await prisma.product.delete({
    where: { id: existingProduct.id },
  });
  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
