/* eslint-disable prettier/prettier */

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  private validGroups = ['TICSW', 'IMAGINE', 'COMIT'];

  async crearProfesor(profesor: Profesor): Promise<Profesor> {
    if (!this.validGroups.includes(profesor.grupoInvestigacion)) {
      throw new BadRequestException('Grupo de investigación inválido.');
    }
    return this.profesorRepository.save(profesor);
  }

  async findProfesorById(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  async eliminarProfesorPorId(id: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { id }, relations: ['propuestas'] });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    const propuestasConProyecto = profesor.propuestas.filter(propuesta => propuesta.proyecto);
    if (propuestasConProyecto.length > 0) {
      throw new BadRequestException('El profesor no se puede eliminar porque tiene propuestas con proyectos asociados.');
    }
    await this.profesorRepository.delete(id);
  }

  async eliminarProfesorPorCedula(numeroCedula: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { numeroCedula }, relations: ['propuestas'] });
    if (!profesor) {
      throw new NotFoundException(`Profesor con número de cédula ${numeroCedula} no encontrado`);
    }
    const propuestasConProyecto = profesor.propuestas.filter(propuesta => propuesta.proyecto);
    if (propuestasConProyecto.length > 0) {
      throw new BadRequestException('El profesor no se puede eliminar porque tiene propuestas con proyectos asociados.');
    }
    await this.profesorRepository.delete(profesor.id);
  }
}
