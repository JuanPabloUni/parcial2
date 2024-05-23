import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';

@Module({
  controllers: [EstudianteController]
})
export class EstudianteModule {}
