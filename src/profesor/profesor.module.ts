import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Propuesta])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
