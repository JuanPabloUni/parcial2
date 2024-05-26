/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  crearEstudiante(@Body() estudiante: Estudiante) {
    return this.estudianteService.crearEstudiante(estudiante);
  }

  @Get(':id')
  findEstudianteById(@Param('id') id: number) {
    return this.estudianteService.findEstudianteById(+id);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

}