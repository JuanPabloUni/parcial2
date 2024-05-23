/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  crearProyecto(@Body() proyecto: Proyecto) {
    return this.proyectoService.crearProyecto(proyecto);
  }
}