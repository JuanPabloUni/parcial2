/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [ProfesorModule, PropuestaModule, ProyectoModule, EstudianteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
