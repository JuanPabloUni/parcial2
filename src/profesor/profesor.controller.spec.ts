/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity';

describe('ProfesorController', () => {
  let controller: ProfesorController;
  let service: ProfesorService;

  const mockProfesorService = {
    crearProfesor: jest.fn(),
    findProfesorById: jest.fn(),
    eliminarProfesorPorId: jest.fn(),
    eliminarProfesorPorCedula: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesorController],
      providers: [
        {
          provide: ProfesorService,
          useValue: mockProfesorService,
        },
      ],
    }).compile();

    controller = module.get<ProfesorController>(ProfesorController);
    service = module.get<ProfesorService>(ProfesorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un profesor', async () => {
    const profesor = { nombre: 'Juan', numeroCedula: 12345, grupoInvestigacion: 'TICSW', numeroExtension: 6789 } as Profesor;
    mockProfesorService.crearProfesor.mockResolvedValue(profesor);

    const result = await controller.crearProfesor(profesor);
    expect(result).toEqual(profesor);
    expect(mockProfesorService.crearProfesor).toHaveBeenCalledWith(profesor);
  });

  it('debería obtener un profesor por ID', async () => {
    const profesor = { id: 1, nombre: 'Juan', numeroCedula: 12345, grupoInvestigacion: 'TICSW', numeroExtension: 6789 } as Profesor;
    mockProfesorService.findProfesorById.mockResolvedValue(profesor);

    const result = await controller.findProfesorById(1);
    expect(result).toEqual(profesor);
    expect(mockProfesorService.findProfesorById).toHaveBeenCalledWith(1);
  });

  it('debería eliminar un profesor por ID', async () => {
    mockProfesorService.eliminarProfesorPorId.mockResolvedValue(undefined);

    await controller.eliminarProfesorPorId(1);
    expect(mockProfesorService.eliminarProfesorPorId).toHaveBeenCalledWith(1);
  });

  it('debería eliminar un profesor por número de cédula', async () => {
    mockProfesorService.eliminarProfesorPorCedula.mockResolvedValue(undefined);

    await controller.eliminarProfesorPorCedula(12345);
    expect(mockProfesorService.eliminarProfesorPorCedula).toHaveBeenCalledWith(12345);
  });
});
