/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuestas')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Post()
  async create(@Body() propuesta: Propuesta) {
    return this.propuestaService.crearPropuesta(propuesta);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const propuesta = await this.propuestaService.findPropuestaById(+id);
    if (!propuesta) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }
    return propuesta;
  }

  @Get()
  async findAll() {
    return this.propuestaService.findAllPropuestas();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.propuestaService.deletePropuesta(+id);
  }
}
