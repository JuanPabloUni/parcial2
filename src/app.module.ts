import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiante/estudiante.entity';
import { Profesor } from './profesor/profesor.entity';
import { Propuesta } from './propuesta/propuesta.entity';
import { Proyecto } from './proyecto/proyecto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'parcial2',
      entities: [Estudiante, Profesor, Propuesta, Proyecto],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    EstudianteModule,
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
