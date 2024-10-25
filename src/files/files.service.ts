import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: string): Promise<string> {
    try {
      const mimeTypeMatch = file.match(/^data:image\/(\w+);base64,/);
      if (!mimeTypeMatch) {
        throw new HttpException('Неверный формат файла', HttpStatus.BAD_REQUEST);
      }

      const extension = mimeTypeMatch[1];
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');

      const fileName = `${uuid.v4()}.${extension}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), base64Data, { encoding: 'base64' });
      return fileName;
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
