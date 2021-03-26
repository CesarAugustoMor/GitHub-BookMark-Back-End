import fs from 'fs';
import path from 'path';
// import mime from 'mime';
import FileType from 'file-type';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  /**
   * saveFile
   */
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // removido devido a erro interno
    // const ContentType = mime.getType(originalPath);

    // if (!ContentType) {
    //   throw new Error('File not found');
    // }

    // Solução temporaria:
    const type = await FileType.fromFile(originalPath);

    if (!type) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.buket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: type.mime,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  /**
   * deleteFile
   */
  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.buket,
        Key: file,
      })
      .promise();
  }
}
