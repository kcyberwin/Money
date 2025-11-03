import { Controller, Get, Post, UseInterceptors, UploadedFile, LoggerService } from '@nestjs/common';
import { FileIoService } from './file-io.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { OfxResponse } from 'ofx-data-extractor';



@Controller('file-io')
export class FileIoController {
    constructor (
        private fileIoService: FileIoService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService    ) {}

    @Post('parsefile')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'file',
                    format: "xml"
                }
            }
        }
    })
    async parseFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file.mimetype);
        console.log(file.filename);
        console.log(file.originalname);
        console.log(file.destination);
        let parseResults;

        switch (file.mimetype) {
            case 'application/vnd.intu.qfx':
                parseResults = await this.fileIoService.processQfxFile(file);
                break;
            case 'application/octet-stream':
                if (file.originalname?.includes('.ofx')) {
                    parseResults = await this.fileIoService.processOfxFile(file);
                } else {
                    parseResults = await this.fileIoService.unsupportedFile(file);
                }
                break;
            default:
                parseResults = await this.fileIoService.unsupportedFile(file);
        }

        return parseResults;
    }

}