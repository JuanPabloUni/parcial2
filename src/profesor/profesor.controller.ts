/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() profesor: Profesor): Promise<Profesor> {
    return this.profesorService.crearProfesor(profesor);
  }

  @Get(':id')
  async findProfesorById(@Param('id') id: number): Promise<Profesor> {
    return this.profesorService.findProfesorById(id);
  }

  @Delete('id/:id')
  async eliminarProfesorPorId(@Param('id') id: number): Promise<void> {
    await this.profesorService.eliminarProfesorPorId(id);
  }

  @Delete('cedula/:cedula')
  async eliminarProfesorPorCedula(@Param('cedula') cedula: number): Promise<void> {
    await this.profesorService.eliminarProfesorPorCedula(cedula);
  }
}
