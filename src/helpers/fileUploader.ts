/* eslint-disable @typescript-eslint/no-unused-vars */
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../shared/files';
import { v4 } from 'uuid';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName as string,
  api_key: config.cloudinary.apiKey as string,
  api_secret: config.cloudinary.apiSecret as string,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profile') {
      cb(null, 'uploads/profile');
    } else if (file.fieldname === 'service') {
      cb(null, 'uploads/service');
    } else if (file.fieldname === 'blog') {
      cb(null, 'uploads/blog');
    }
  },
  filename: function (req, file, cb) {
    const extname = file.originalname;
    const uniqueFilename = v4() + '-' + extname;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
