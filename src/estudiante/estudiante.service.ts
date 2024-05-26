/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}

  async crearEstudiante(estudiante: Estudiante) {
    if (estudiante.codigoEstudiante.length !== 10) {
      throw new Error('El código del estudiante debe tener 10 caracteres');
    }
    return this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: number) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  findAll() {
    return this.estudianteRepository.find();
  }
}
