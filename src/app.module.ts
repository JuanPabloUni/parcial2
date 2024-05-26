import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { Profesor } from './profesor/profesor.entity';
import { Proyecto } from './proyecto/proyecto.entity';
import { Estudiante } from './estudiante/estudiante.entity';
import { Propuesta } from './propuesta/propuesta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'parcial2',
      entities: [Profesor, Proyecto, Estudiante, Propuesta],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    ProyectoModule,
    EstudianteModule,
    PropuestaModule,
    ProfesorModule,
  ],
})
export class AppModule {}
