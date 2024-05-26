/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';
import { NotFoundException } from '@nestjs/common';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let mockPropuestaRepository: Repository<Propuesta>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(Propuesta),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    mockPropuestaRepository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));

    jest.spyOn(mockPropuestaRepository, 'save').mockResolvedValue(null);
    jest.spyOn(mockPropuestaRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(mockPropuestaRepository, 'find').mockResolvedValue([]);
    jest.spyOn(mockPropuestaRepository, 'delete').mockResolvedValue(null);
  });

  it('debería crear una propuesta', async () => {
    const propuesta = { titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' } as Propuesta;
    jest.spyOn(mockPropuestaRepository, 'save').mockResolvedValue(propuesta);

    const result = await service.crearPropuesta(propuesta);
    expect(result).toEqual(propuesta);
  });

  it('debería retornar la propuesta por ID (caso positivo)', async () => {
    const propuesta = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' } as Propuesta;
    jest.spyOn(mockPropuestaRepository, 'findOne').mockResolvedValue(propuesta);

    const result = await service.findPropuestaById(1);
    expect(result).toEqual(propuesta);
    expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('debería lanzar una excepción si la propuesta no existe (caso negativo)', async () => {
    jest.spyOn(mockPropuestaRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findPropuestaById(1)).rejects.toThrow(NotFoundException);
    expect(mockPropuestaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('debería retornar todas las propuestas', async () => {
    const propuestas = [{ id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' }] as Propuesta[];
    jest.spyOn(mockPropuestaRepository, 'find').mockResolvedValue(propuestas);

    const result = await service.findAllPropuestas();
    expect(result).toEqual(propuestas);
  });

  it('debería eliminar una propuesta por ID', async () => {
    const propuesta = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' } as Propuesta;
    jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuesta);
    jest.spyOn(mockPropuestaRepository, 'delete').mockResolvedValue(null);

    await service.deletePropuesta(1);
    expect(service.findPropuestaById).toHaveBeenCalledWith(1);
    expect(mockPropuestaRepository.delete).toHaveBeenCalledWith(1);
  });

  it('debería lanzar un error al eliminar una propuesta con proyecto asociado', async () => {
    const propuesta = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave', proyecto: {} } as Propuesta;
    jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuesta);
    jest.spyOn(mockPropuestaRepository, 'delete').mockResolvedValue(null);

    await expect(service.deletePropuesta(1)).rejects.toThrow(Error);
    expect(service.findPropuestaById).toHaveBeenCalledWith(1);
    expect(mockPropuestaRepository.delete).not.toHaveBeenCalled();
  });
});
