/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';

describe('EstudianteController', () => {
  let controller: EstudianteController;
  let service: EstudianteService;

  const mockEstudianteService = {
    crearEstudiante: jest.fn(),
    findEstudianteById: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudianteController],
      providers: [
        {
          provide: EstudianteService,
          useValue: mockEstudianteService,
        },
      ],
    }).compile();

    controller = module.get<EstudianteController>(EstudianteController);
    service = module.get<EstudianteService>(EstudianteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un estudiante', async () => {
    const estudiante = { nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 } as Estudiante;
    mockEstudianteService.crearEstudiante.mockResolvedValue(estudiante);

    const result = await controller.crearEstudiante(estudiante);
    expect(result).toEqual(estudiante);
    expect(mockEstudianteService.crearEstudiante).toHaveBeenCalledWith(estudiante);
  });

  it('debería obtener un estudiante por ID', async () => {
    const estudiante = { id: 1, nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 } as Estudiante;
    mockEstudianteService.findEstudianteById.mockResolvedValue(estudiante);

    const result = await controller.findEstudianteById(1);
    expect(result).toEqual(estudiante);
    expect(mockEstudianteService.findEstudianteById).toHaveBeenCalledWith(1);
  });

  it('debería obtener todos los estudiantes', async () => {
    const estudiantes = [{ id: 1, nombre: 'Carlos', codigoEstudiante: '1234567890', numeroCreditosAprobados: 30 }] as Estudiante[];
    mockEstudianteService.findAll.mockResolvedValue(estudiantes);

    const result = await controller.findAll();
    expect(result).toEqual(estudiantes);
    expect(mockEstudianteService.findAll).toHaveBeenCalled();
  });
});
