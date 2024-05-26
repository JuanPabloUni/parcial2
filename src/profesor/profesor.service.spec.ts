/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepository: Repository<Profesor>;
  let propuestaRepository: Repository<Propuesta>;

  const mockProfesorRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockPropuestaRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(Profesor),
          useValue: mockProfesorRepository,
        },
        {
          provide: getRepositoryToken(Propuesta),
          useValue: mockPropuestaRepository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepository = module.get<Repository<Profesor>>(getRepositoryToken(Profesor));
    propuestaRepository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('crearProfesor', () => {
    it('debería crear un profesor (caso positivo)', async () => {
      const profesor = { nombre: 'John Doe', numeroCedula: 1234567890, grupoInvestigacion: 'TICSW', numeroExtension: 1234 } as Profesor;
      mockProfesorRepository.save.mockResolvedValue(profesor);

      const result = await service.crearProfesor(profesor);
      expect(result).toEqual(profesor);
      expect(mockProfesorRepository.save).toHaveBeenCalledWith(profesor);
    });

    it('debería lanzar una excepción si el grupo de investigación es inválido (caso negativo)', async () => {
      const profesor = { nombre: 'John Doe', numeroCedula: 1234567890, grupoInvestigacion: 'INVALID', numeroExtension: 1234 } as Profesor;

      await expect(service.crearProfesor(profesor)).rejects.toThrow(BadRequestException);
      expect(mockProfesorRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findProfesorById', () => {
    it('debería retornar el profesor por ID (caso positivo)', async () => {
      const profesor = { id: 1, nombre: 'John Doe', numeroCedula: 1234567890, grupoInvestigacion: 'TICSW', numeroExtension: 1234 } as Profesor;
      mockProfesorRepository.findOne.mockResolvedValue(profesor);

      const result = await service.findProfesorById(1);
      expect(result).toEqual(profesor);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('debería lanzar una excepción si el profesor no existe (caso negativo)', async () => {
      mockProfesorRepository.findOne.mockResolvedValue(null);

      await expect(service.findProfesorById(1)).rejects.toThrow(NotFoundException);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('eliminarProfesorPorId', () => {
    it('debería eliminar el profesor por ID (caso positivo)', async () => {
      const profesor = { id: 1, propuestas: [] } as Profesor;
      mockProfesorRepository.findOne.mockResolvedValue(profesor);
      mockProfesorRepository.delete.mockResolvedValue(undefined);

      await service.eliminarProfesorPorId(1);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar una excepción si el profesor tiene propuestas con proyectos asociados (caso negativo)', async () => {
      const propuesta = { proyecto: {} } as Propuesta;
      const profesor = { id: 1, propuestas: [propuesta] } as Profesor;
      mockProfesorRepository.findOne.mockResolvedValue(profesor);

      await expect(service.eliminarProfesorPorId(1)).rejects.toThrow(BadRequestException);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).not.toHaveBeenCalled();
    });

    it('debería lanzar una excepción si el profesor no existe (caso negativo)', async () => {
      mockProfesorRepository.findOne.mockResolvedValue(null);

      await expect(service.eliminarProfesorPorId(1)).rejects.toThrow(NotFoundException);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('eliminarProfesorPorCedula', () => {
    it('debería eliminar el profesor por número de cédula (caso positivo)', async () => {
      const profesor = { id: 1, numeroCedula: 1234567890, propuestas: [] } as Profesor;
      mockProfesorRepository.findOne.mockResolvedValue(profesor);
      mockProfesorRepository.delete.mockResolvedValue(undefined);

      await service.eliminarProfesorPorCedula(1234567890);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { numeroCedula: 1234567890 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar una excepción si el profesor tiene propuestas con proyectos asociados (caso negativo)', async () => {
      const propuesta = { proyecto: {} } as Propuesta;
      const profesor = { id: 1, numeroCedula: 1234567890, propuestas: [propuesta] } as Profesor;
      mockProfesorRepository.findOne.mockResolvedValue(profesor);

      await expect(service.eliminarProfesorPorCedula(1234567890)).rejects.toThrow(BadRequestException);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { numeroCedula: 1234567890 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).not.toHaveBeenCalled();
    });

    it('debería lanzar una excepción si el profesor no existe (caso negativo)', async () => {
      mockProfesorRepository.findOne.mockResolvedValue(null);

      await expect(service.eliminarProfesorPorCedula(1234567890)).rejects.toThrow(NotFoundException);
      expect(mockProfesorRepository.findOne).toHaveBeenCalledWith({ where: { numeroCedula: 1234567890 }, relations: ['propuestas'] });
      expect(mockProfesorRepository.delete).not.toHaveBeenCalled();
    });
  });
});
