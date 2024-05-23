/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Post()
  create(@Body() propuesta: Propuesta) {
    return this.propuestaService.create(propuesta);
  }

  @Get()
  findAll() {
    return this.propuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propuestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropuestaDto: Partial<Propuesta>) {
    return this.propuestaService.update(+id, updatePropuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propuestaService.remove(+id);
  }
}
