import { Controller, UseInterceptors, Post, UploadedFile, Logger, Inject } from '@nestjs/common';
import { FileIoService } from './file-io.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { OfxResponse } from 'ofx-data-extractor';
import { getMethodName } from '../common/utils/utils'


@Controller('file-io')
export class FileIoController {

    constructor(
        private fileIoService: FileIoService,
        private logger: Logger
    ) { }

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
        const context = getMethodName(new Error('fake'));
        try {
            
            let parseResults;
            this.logger.debug(`Parsing File ${file.originalname} mimetype ${file.mimetype}`, context);
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
        catch (e) {
            this.logger.error(e.message, e.stack, context);
        }

    }

}