import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileIoController } from './file-io/file-io.controller';
import { FileIoService } from './file-io/file-io.service';
import { ConfigModule } from '@nestjs/config';
import { DBController } from './database/db.controller';
import { MysqlService } from './database/mysql/mysql.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, FileIoController, DBController],
  providers: [AppService, FileIoService, MysqlService, Logger],
})
export class AppModule {}
