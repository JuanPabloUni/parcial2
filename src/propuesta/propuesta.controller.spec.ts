/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

describe('PropuestaController', () => {
  let controller: PropuestaController;
  let service: PropuestaService;

  const mockPropuestaService = {
    crearPropuesta: jest.fn(),
    findPropuestaById: jest.fn(),
    findAllPropuesta: jest.fn(),
    deletePropuesta: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropuestaController],
      providers: [
        {
          provide: PropuestaService,
          useValue: mockPropuestaService,
        },
      ],
    }).compile();

    controller = module.get<PropuestaController>(PropuestaController);
    service = module.get<PropuestaService>(PropuestaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una propuesta', async () => {
    const propuesta = { titulo: 'Proyecto 1', descripcion: 'Descripción', palabraClave: 'Clave' } as Propuesta;
    mockPropuestaService.crearPropuesta.mockResolvedValue(propuesta);

    const result = await controller.crearPropuesta(propuesta);
    expect(result).toEqual(propuesta);
    expect(mockPropuestaService.crearPropuesta).toHaveBeenCalledWith(propuesta);
  });

  it('debería obtener una propuesta por ID', async () => {
    const propuesta = { id: 1, titulo: 'Proyecto 1', descripcion: 'Descripción', palabraClave: 'Clave' } as Propuesta;
    mockPropuestaService.findPropuestaById.mockResolvedValue(propuesta);

    const result = await controller.findPropuestaById(1);
    expect(result).toEqual(propuesta);
    expect(mockPropuestaService.findPropuestaById).toHaveBeenCalledWith(1);
  });

  it('debería obtener todas las propuestas', async () => {
    const propuestas = [{ id: 1, titulo: 'Proyecto 1', descripcion: 'Descripción', palabraClave: 'Clave' }] as Propuesta[];
    mockPropuestaService.findAllPropuesta.mockResolvedValue(propuestas);

    const result = await controller.findAllPropuesta();
    expect(result).toEqual(propuestas);
    expect(mockPropuestaService.findAllPropuesta).toHaveBeenCalled();
  });

  it('debería eliminar una propuesta por ID', async () => {
    mockPropuestaService.deletePropuesta.mockResolvedValue(undefined);

    await controller.deletePropuesta(1);
    expect(mockPropuestaService.deletePropuesta).toHaveBeenCalledWith(1);
  });
});
