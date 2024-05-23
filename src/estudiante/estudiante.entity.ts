import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  codigoEstudiante: string;

  @Column({ type: 'int' })
  numeroCreditosAprobados: number;
}
