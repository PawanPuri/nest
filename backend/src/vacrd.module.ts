import { Module } from '@nestjs/common';
import { VCardService } from './vcard.service';
import { VCardController } from './vcard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VCard,VCardSchema } from './schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: VCard.name, schema: VCardSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [VCardController],
  providers: [VCardService],
})
export class VCardModule {}
