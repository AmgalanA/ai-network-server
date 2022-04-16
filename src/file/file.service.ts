import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

export enum FileType {
  IMAGE = 'image',
  POSTIMAGE = 'post-image',
  GROUPIMAGE = 'group-image',
  AUDIO = 'audio',
  AUDIOPICTURE = 'audio-picture',
}

@Injectable()
export class FileService {
  createFile(file: Express.Multer.File, type: FileType): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
