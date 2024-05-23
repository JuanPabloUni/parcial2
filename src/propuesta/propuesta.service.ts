/* eslint-disable prettier/prettier */

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  async crearPropuesta(propuesta: Propuesta): Promise<Propuesta> {
    if (!propuesta.titulo || propuesta.titulo.trim().length === 0) {
      throw new BadRequestException('El título no puede ser vacío.');
    }
    return this.propuestaRepository.save(propuesta);
  }

  async findPropuestaById(id: number): Promise<Propuesta> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }
    return propuesta;
  }

  async findAllPropuesta(): Promise<Propuesta[]> {
    return this.propuestaRepository.find();
  }

  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id }, relations: ['proyecto'] });
    if (!propuesta) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }
    if (propuesta.proyecto) {
      throw new BadRequestException('La propuesta no se puede eliminar porque tiene un proyecto asociado.');
    }
    await this.propuestaRepository.delete(id);
  }
}
