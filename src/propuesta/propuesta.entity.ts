/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Profesor } from '../profesor/profesor.entity';

@Entity()
export class Propuesta {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  palabraClave: string;

  @OneToOne(() => Proyecto)
  @JoinColumn()
  proyecto: Proyecto;

  @ManyToOne(() => Profesor, profesor => profesor.propuestas)
  profesor: Profesor;
}
