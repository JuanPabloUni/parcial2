import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  create(proyecto: Proyecto) {
    return this.proyectoRepository.save(proyecto);
  }

  findAll() {
    return this.proyectoRepository.find();
  }

  findOne(id: number) {
    return this.proyectoRepository.findOne({ where: { id } });
  }

  update(id: number, updateProyectoDto: Partial<Proyecto>) {
    return this.proyectoRepository.update(id, updateProyectoDto);
  }

  remove(id: number) {
    return this.proyectoRepository.delete(id);
  }
}
