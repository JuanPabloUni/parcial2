import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}

  create(estudiante: Estudiante) {
    return this.estudianteRepository.save(estudiante);
  }

  findAll() {
    return this.estudianteRepository.find();
  }

  findOne(id: number) {
    return this.estudianteRepository.findOne({ where: { id } });
  }

  update(id: number, updateEstudianteDto: Partial<Estudiante>) {
    return this.estudianteRepository.update(id, updateEstudianteDto);
  }

  remove(id: number) {
    return this.estudianteRepository.delete(id);
  }
}
