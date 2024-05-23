/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() estudiante: Estudiante) {
    return this.estudianteService.create(estudiante);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: Partial<Estudiante>) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
