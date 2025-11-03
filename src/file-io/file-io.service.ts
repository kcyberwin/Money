import { Injectable, Logger } from '@nestjs/common';
import { Ofx, OfxResponse } from 'ofx-data-extractor';
import { getMethodName } from 'src/common/utils/utils';

@Injectable()
export class FileIoService {
   constructor (
      private logger: Logger
   ) {}

   async processQfxFile(file: Express.Multer.File): Promise<OfxResponse> {
      let context = getMethodName(Error('fake'));
      try {
         const ofx = await Ofx.fromBuffer(file.buffer);
         this.logger.debug(`processing Qfx file: ${file.originalname}`, context);

         const ofxResponse = ofx.toJson();
         //console.dir(ofxResponse, { depth: 100 })
         return ofxResponse;
      } 
      catch (e) {
         this.logger.error(`Error processing file ${file.originalname}`, e.stack, context)
         throw new Error('Qfx processing error');
      }
   }

   async processOfxFile(file: Express.Multer.File): Promise<OfxResponse> {
      const ofx = await Ofx.fromBuffer(file.buffer);
      const ofxResponse = ofx.toJson();
      //console.dir(ofxResponse, { depth: 100 })
      return ofxResponse;
   }

   async unsupportedFile(file: Express.Multer.File): Promise<OfxResponse> {
      throw new Error(`Unsupported File Type mimetype: ${file.mimetype}`);
   }

}