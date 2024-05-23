import { Module } from '@nestjs/common';
import { PropuestaController } from './propuesta.controller';

@Module({
  controllers: [PropuestaController]
})
export class PropuestaModule {}
