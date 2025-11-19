import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: {
        service: 'MyMoney-bff',
        environment: process.env.NODE_ENV || 'dev',
      },
      transports: [new winston.transports.Console()],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Money APIs')
    .setDescription('Supporting backend APis for Money App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
