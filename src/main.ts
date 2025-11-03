import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_PROVIDER));
  
  const config = new DocumentBuilder()
    .setTitle('Money APIs')
    .setDescription('Supporting backend APis for Money App')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none'
    }
  });
  
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
