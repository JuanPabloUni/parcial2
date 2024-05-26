/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';

describe('ProyectoController', () => {
  let controller: ProyectoController;
  let service: ProyectoService;

  const mockProyectoService = {
    crearProyecto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoController],
      providers: [
        {
          provide: ProyectoService,
          useValue: mockProyectoService,
        },
      ],
    }).compile();

    controller = module.get<ProyectoController>(ProyectoController);
    service = module.get<ProyectoService>(ProyectoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un proyecto', async () => {
    const proyecto = { fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), url: 'http://example.com' } as Proyecto;
    mockProyectoService.crearProyecto.mockResolvedValue(proyecto);

    const result = await controller.crearProyecto(proyecto);
    expect(result).toEqual(proyecto);
    expect(mockProyectoService.crearProyecto).toHaveBeenCalledWith(proyecto);
  });
});
