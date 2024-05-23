import { Module } from '@nestjs/common';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';

@Module({
  controllers: [PropuestaController],
  providers: [PropuestaService]
})
export class PropuestaModule {}
