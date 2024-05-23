import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  create(profesor: Profesor) {
    return this.profesorRepository.save(profesor);
  }

  findAll() {
    return this.profesorRepository.find();
  }

  findOne(id: number) {
    return this.profesorRepository.findOne({ where: { id } });
  }

  update(id: number, updateProfesorDto: Partial<Profesor>) {
    return this.profesorRepository.update(id, updateProfesorDto);
  }

  remove(id: number) {
    return this.profesorRepository.delete(id);
  }
}
