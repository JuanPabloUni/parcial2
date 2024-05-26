/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { Repository } from 'typeorm';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<Proyecto>;

  const mockProyectoRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(Proyecto),
          useValue: mockProyectoRepository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('crearProyecto', () => {
    it('debería crear un proyecto (caso positivo)', async () => {
      const proyecto = {
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-12-31'),
        url: 'http://example.com',
      } as Proyecto;
      mockProyectoRepository.save.mockResolvedValue(proyecto);

      const result = await service.crearProyecto(proyecto);
      expect(result).toEqual(proyecto);
      expect(mockProyectoRepository.save).toHaveBeenCalledWith(proyecto);
    });

    it('debería lanzar una excepción si la fecha de fin es anterior o igual a la fecha de inicio (caso negativo)', async () => {
      const proyecto = {
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2023-12-31'),
        url: 'http://example.com',
      } as Proyecto;

      await expect(service.crearProyecto(proyecto)).rejects.toThrow('La fecha de fin debe ser posterior a la fecha de inicio');
      expect(mockProyectoRepository.save).not.toHaveBeenCalled();
    });
  });
});
