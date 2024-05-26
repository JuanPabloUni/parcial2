/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';
import { NotFoundException } from '@nestjs/common';

describe('PropuestaController', () => {
  let controller: PropuestaController;
  let service: PropuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropuestaController],
      providers: [
        {
          provide: PropuestaService,
          useValue: {
            crearPropuesta: jest.fn(),
            findPropuestaById: jest.fn(),
            findAllPropuestas: jest.fn(),
            deletePropuesta: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PropuestaController>(PropuestaController);
    service = module.get<PropuestaService>(PropuestaService);
  });

  it('debería crear una propuesta', async () => {
    const propuesta = { titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' } as Propuesta;
    jest.spyOn(service, 'crearPropuesta').mockResolvedValue(propuesta);

    expect(await controller.create(propuesta)).toBe(propuesta);
  });

  it('debería retornar una propuesta por ID', async () => {
    const propuesta = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' } as Propuesta;
    jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuesta);

    expect(await controller.findOne('1')).toBe(propuesta);
  });

  it('debería lanzar una excepción si la propuesta no existe', async () => {
    jest.spyOn(service, 'findPropuestaById').mockResolvedValue(null);

    await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('debería retornar todas las propuestas', async () => {
    const propuestas = [{ id: 1, titulo: 'Propuesta 1', descripcion: 'Descripción', palabraClave: 'clave' }] as Propuesta[];
    jest.spyOn(service, 'findAllPropuestas').mockResolvedValue(propuestas);

    expect(await controller.findAll()).toBe(propuestas);
  });

  it('debería eliminar una propuesta por ID', async () => {
    jest.spyOn(service, 'deletePropuesta').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
  });
});
