import { Module } from '@nestjs/common';
import { ProyectoController } from './proyecto.controller';

@Module({
  controllers: [ProyectoController]
})
export class ProyectoModule {}
