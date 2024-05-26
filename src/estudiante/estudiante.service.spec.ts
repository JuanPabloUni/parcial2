/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<Estudiante>;

  const mockEstudianteRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useValue: mockEstudianteRepository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('crearEstudiante', () => {
    it('debería crear un estudiante (caso positivo)', async () => {
      const estudiante = { nombre: 'John Doe', codigoEstudiante: '1234567890', numeroCreditosAprobados: 120 } as Estudiante;
      mockEstudianteRepository.save.mockResolvedValue(estudiante);

      const result = await service.crearEstudiante(estudiante);
      expect(result).toEqual(estudiante);
      expect(mockEstudianteRepository.save).toHaveBeenCalledWith(estudiante);
    });

    it('debería lanzar una excepción si el código del estudiante no tiene 10 caracteres (caso negativo)', async () => {
      const estudiante = { nombre: 'John Doe', codigoEstudiante: '12345', numeroCreditosAprobados: 120 } as Estudiante;

      await expect(service.crearEstudiante(estudiante)).rejects.toThrow(Error);
      expect(mockEstudianteRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findEstudianteById', () => {
    it('debería retornar el estudiante por ID (caso positivo)', async () => {
      const estudiante = { id: 1, nombre: 'John Doe', codigoEstudiante: '1234567890', numeroCreditosAprobados: 120 } as Estudiante;
      mockEstudianteRepository.findOne.mockResolvedValue(estudiante);

      const result = await service.findEstudianteById(1);
      expect(result).toEqual(estudiante);
      expect(mockEstudianteRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('debería lanzar una excepción si el estudiante no existe (caso negativo)', async () => {
      mockEstudianteRepository.findOne.mockResolvedValue(null);

      await expect(service.findEstudianteById(1)).rejects.toThrow(NotFoundException);
      expect(mockEstudianteRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los estudiantes (caso positivo)', async () => {
      const estudiantes = [
        { id: 1, nombre: 'John Doe', codigoEstudiante: '1234567890', numeroCreditosAprobados: 120 },
        { id: 2, nombre: 'Jane Doe', codigoEstudiante: '0987654321', numeroCreditosAprobados: 100 }
      ] as Estudiante[];
      mockEstudianteRepository.find.mockResolvedValue(estudiantes);

      const result = await service.findAll();
      expect(result).toEqual(estudiantes);
      expect(mockEstudianteRepository.find).toHaveBeenCalled();
    });
  });
});
