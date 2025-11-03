import { Injectable } from '@nestjs/common';
import { Ofx, OfxResponse } from 'ofx-data-extractor';

@Injectable()
export class FileIoService {

   async processQfxFile(file: Express.Multer.File): Promise<OfxResponse> {
      const ofx = await Ofx.fromBuffer(file.buffer);
      console.log('processing qfx', ofx.getHeaders());

      const ofxResponse = ofx.toJson();
      console.dir(ofxResponse, { depth: 100 })
      return ofxResponse;

   }

   async processOfxFile(file: Express.Multer.File): Promise<OfxResponse> {
      const ofx = await Ofx.fromBuffer(file.buffer);
      console.log('processing ofx', ofx.getHeaders());
      const ofxResponse = ofx.toJson();
      console.dir(ofxResponse, { depth: 100 })
      return ofxResponse;
   }

   async unsupportedFile(file: Express.Multer.File): Promise<OfxResponse> {
      throw new Error('Unsupported File Type');
   }

}