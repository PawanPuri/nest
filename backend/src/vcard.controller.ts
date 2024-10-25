import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VCardService } from './vcard.service';
import { extname } from 'path';
import { VCard ,} from './schema';

@Controller('vcard')
export class VCardController {
  constructor(private readonly vCardService: VCardService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Extract file extension
          cb(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Optional: Validate file type
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createVCard(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Body:', body); // Debugging the incoming body
    console.log('File:', file); // Debugging the uploaded file

    // Check if both body and file are properly received
    if (!body || !file) {
      throw new BadRequestException('Invalid data or missing file');
    }

    // Construct the image URL
    const imageUrl = `/uploads/${file.filename}`;
    const qrCode = body.qrCode; // Assuming the QR code is sent as a string in the body

    // Merge image URL and QR code into the body data
    const newVCard = { ...body, imageUrl, qrCode };

    // Process and save the VCard
    return this.vCardService.create(newVCard);
  }

  @Get()
  async getAllVCards() {
    return this.vCardService.findAll(); // Return all the VCards
  }


   // New method to get VCard by ID
   @Get(':id')
   async getVCardById(@Param('id') id: string) {
     try {
       return await this.vCardService.findById(id);
     } catch (error) {
       throw new NotFoundException(`VCard with ID ${id} not found`);
     }
   }
}
