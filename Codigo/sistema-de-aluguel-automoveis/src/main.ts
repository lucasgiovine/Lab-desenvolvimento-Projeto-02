import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
// seria bom testes end to end para as principais funcionalidades.

//Faltaram testes unitários aqui. Vale incluir para garantir que as regras principais fiquem cobertas e evitar que mudanças futuras quebrem o comportamento esperado.
bootstrap();
