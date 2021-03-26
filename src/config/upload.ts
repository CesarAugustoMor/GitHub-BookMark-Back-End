import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      buket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        let filename = file.originalname;

        while (filename.search(' ') > 0) {
          filename = filename.replace(' ', '_');
        }

        const fileName = `${fileHash}-${filename}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      buket: 'sbs-reciclagem-eletronica',
    },
  },
} as IUploadConfig;
