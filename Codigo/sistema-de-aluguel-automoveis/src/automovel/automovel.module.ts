import { Module } from '@nestjs/common';
import { AutomovelService } from './automovel.service';
import { AutomovelController } from './automovel.controller';

@Module({
  providers: [AutomovelService],
  controllers: [AutomovelController]
})
export class AutomovelModule {}
