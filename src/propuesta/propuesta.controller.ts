/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Post()
  async crearPropuesta(@Body() propuesta: Propuesta): Promise<Propuesta> {
    return this.propuestaService.crearPropuesta(propuesta);
  }

  @Get(':id')
  async findPropuestaById(@Param('id') id: number): Promise<Propuesta> {
    return this.propuestaService.findPropuestaById(id);
  }

  @Get()
  async findAllPropuesta(): Promise<Propuesta[]> {
    return this.propuestaService.findAllPropuesta();
  }

  @Get()
  findAllWithRelations() {
    return this.propuestaService.findAllWithRelations();
  }

  @Delete(':id')
  async deletePropuesta(@Param('id') id: number): Promise<void> {
    await this.propuestaService.deletePropuesta(id);
  }
}
