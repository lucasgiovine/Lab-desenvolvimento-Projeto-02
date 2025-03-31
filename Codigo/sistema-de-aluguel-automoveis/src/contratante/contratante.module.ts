import { Module } from '@nestjs/common';
import { ContratanteService } from './contratante.service';
import { ContratanteController } from './contratante.controller';

@Module({
  providers: [ContratanteService],
  controllers: [ContratanteController]
})
export class ContratanteModule {}
