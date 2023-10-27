import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS
  // app.enableCors();
  //

  //
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API template')
    .setDescription('NestJS api template')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //

  await app.listen(3001);
  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
}
bootstrap();
