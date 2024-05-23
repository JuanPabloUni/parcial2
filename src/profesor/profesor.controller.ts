/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async create(@Body() profesor: Profesor): Promise<Profesor> {
    return this.profesorService.crearProfesor(profesor);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profesor> {
    return this.profesorService.findProfesorById(id);
  }

  @Delete('id/:id')
  async removeById(@Param('id') id: number): Promise<void> {
    await this.profesorService.eliminarProfesorPorId(id);
  }

  @Delete('cedula/:cedula')
  async removeByCedula(@Param('cedula') cedula: number): Promise<void> {
    await this.profesorService.eliminarProfesorPorCedula(cedula);
  }
}
