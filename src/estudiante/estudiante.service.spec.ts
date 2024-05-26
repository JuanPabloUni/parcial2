/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';
import { NotFoundException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let mockEstudianteRepository: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    mockEstudianteRepository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  it('debería crear un estudiante', async () => {
    const estudiante = { nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 } as Estudiante;
    jest.spyOn(mockEstudianteRepository, 'save').mockResolvedValue(estudiante);

    const result = await service.crearEstudiante(estudiante);
    expect(result).toEqual(estudiante);
  });

  it('debería obtener un estudiante por ID', async () => {
    const estudiante = { id: 1, nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 } as Estudiante;
    jest.spyOn(mockEstudianteRepository, 'findOne').mockResolvedValue(estudiante);

    const result = await service.findEstudianteById(1);
    expect(result).toEqual(estudiante);
  });

  it('debería lanzar una excepción si el estudiante no existe (caso negativo)', async () => {
    jest.spyOn(mockEstudianteRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findEstudianteById(1)).rejects.toThrow(NotFoundException);
    expect(mockEstudianteRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('debería obtener todos los estudiantes', async () => {
    const estudiantes = [{ id: 1, nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 }] as Estudiante[];
    jest.spyOn(mockEstudianteRepository, 'find').mockResolvedValue(estudiantes);

    const result = await service.findAll();
    expect(result).toEqual(estudiantes);
  });
});
