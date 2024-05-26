/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  async crearPropuesta(propuesta: Propuesta) {
    if (!propuesta.titulo || propuesta.titulo.trim() === '') {
      throw new Error('El título no puede estar vacío');
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

  async findAllPropuestas(): Promise<Propuesta[]> {
    return this.propuestaRepository.find();
  }

  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.findPropuestaById(id);
    if (propuesta.proyecto) {
      throw new Error('La propuesta no se puede eliminar porque tiene un proyecto asociado');
    }
    await this.propuestaRepository.delete(id);
  }
}
