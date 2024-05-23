import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(Propuesta)
    private propuestaRepository: Repository<Propuesta>,
  ) {}

  create(propuesta: Propuesta) {
    return this.propuestaRepository.save(propuesta);
  }

  findAll() {
    return this.propuestaRepository.find();
  }

  findOne(id: number) {
    return this.propuestaRepository.findOne({ where: { id } });
  }

  update(id: number, updatePropuestaDto: Partial<Propuesta>) {
    return this.propuestaRepository.update(id, updatePropuestaDto);
  }

  remove(id: number) {
    return this.propuestaRepository.delete(id);
  }
}
