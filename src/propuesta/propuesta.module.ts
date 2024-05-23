import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propuesta } from './propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Propuesta])],
  controllers: [PropuestaController],
  providers: [PropuestaService],
})
export class PropuestaModule {}
