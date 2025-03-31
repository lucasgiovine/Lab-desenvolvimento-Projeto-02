import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomovelModule } from './automovel/automovel.module';
import { ContratanteModule } from './contratante/contratante.module';
import { AuthModule } from './auth/auth.module';
import { AluguelModule } from './aluguel/aluguel.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ContratanteModule,
    AutomovelModule,
    AuthModule,
    AluguelModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
