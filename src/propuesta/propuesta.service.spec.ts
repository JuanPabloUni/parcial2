/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Propuesta } from './propuesta.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<Propuesta>;

  const mockPropuestaRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(Propuesta),
          useValue: mockPropuestaRepository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('crearPropuesta', () => {
    it('debería crear una propuesta (caso positivo)', async () => {
      const propuesta = { titulo: 'Titulo Valido', descripcion: 'Descripcion', palabraClave: 'PalabraClave' } as Propuesta;
      mockPropuestaRepository.save.mockResolvedValue(propuesta);

      const result = await service.crearPropuesta(propuesta);
      expect(result).toEqual(propuesta);
      expect(mockPropuestaRepository.save).toHaveBeenCalledWith(propuesta);
    });

    it('debería lanzar una excepción si el título es vacío (caso negativo)', async () => {
      const propuesta = { titulo: '', descripcion: 'Descripcion', palabraClave: 'PalabraClave' } as Propuesta;

      await expect(service.crearPropuesta(propuesta)).rejects.toThrow(BadRequestException);
      expect(mockPropuestaRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findPropuestaById', () => {
    it('debería retornar la propuesta por ID (caso positivo)', async () => {
      const propuesta = { id: 1, titulo: 'Titulo Valido', descripcion: 'Descripcion', palabraClave: 'PalabraClave' } as Propuesta;
      mockPropuestaRepository.findOne.mockResolvedValue(propuesta);

      const result = await service.findPropuestaById(1);
      expect(result).toEqual(propuesta);
      expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('debería lanzar una excepción si la propuesta no existe (caso negativo)', async () => {
      mockPropuestaRepository.findOne.mockResolvedValue(null);

      await expect(service.findPropuestaById(1)).rejects.toThrow(NotFoundException);
      expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findAllPropuesta', () => {
    it('debería retornar todas las propuestas (caso positivo)', async () => {
      const propuestas = [
        { id: 1, titulo: 'Titulo 1', descripcion: 'Descripcion 1', palabraClave: 'PalabraClave 1' },
        { id: 2, titulo: 'Titulo 2', descripcion: 'Descripcion 2', palabraClave: 'PalabraClave 2' }
      ] as Propuesta[];
      mockPropuestaRepository.find.mockResolvedValue(propuestas);

      const result = await service.findAllPropuesta();
      expect(result).toEqual(propuestas);
      expect(mockPropuestaRepository.find).toHaveBeenCalled();
    });
  });

  describe('deletePropuesta', () => {
    it('debería eliminar una propuesta sin proyecto (caso positivo)', async () => {
      const propuesta = { id: 1, titulo: 'Titulo Valido', descripcion: 'Descripcion', palabraClave: 'PalabraClave', proyecto: null } as Propuesta;
      mockPropuestaRepository.findOne.mockResolvedValue(propuesta);
      mockPropuestaRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deletePropuesta(1);
      expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith(1, { relations: ['proyecto'] });
      expect(mockPropuestaRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar una excepción si la propuesta tiene un proyecto asociado (caso negativo)', async () => {
      const propuesta = { id: 1, titulo: 'Titulo Valido', descripcion: 'Descripcion', palabraClave: 'PalabraClave', proyecto: {} } as Propuesta;
      mockPropuestaRepository.findOne.mockResolvedValue(propuesta);

      await expect(service.deletePropuesta(1)).rejects.toThrow(BadRequestException);
      expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith(1, { relations: ['proyecto'] });
      expect(mockPropuestaRepository.delete).not.toHaveBeenCalled();
    });

    it('debería lanzar una excepción si la propuesta no existe (caso negativo)', async () => {
      mockPropuestaRepository.findOne.mockResolvedValue(null);

      await expect(service.deletePropuesta(1)).rejects.toThrow(NotFoundException);
      expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith(1, { relations: ['proyecto'] });
      expect(mockPropuestaRepository.delete).not.toHaveBeenCalled();
    });
  });
});
