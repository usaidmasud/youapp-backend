import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async uploadPhotoProfile(photo: Express.Multer.File) {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const extension = photo.originalname.split('.').pop();
    const filename = `${Date.now()}.${extension}`;
    const fullPath = path.join(uploadsDir, filename);

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    fs.writeFileSync(fullPath, photo.buffer);

    return {
      filename,
    };
  }

  async getFile(filename: string) {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const fullPath = path.join(uploadsDir, filename);
    if (!fs.existsSync(fullPath)) {
      throw new Error('File not found');
    }
    return fs.createReadStream(fullPath);
  }
}
