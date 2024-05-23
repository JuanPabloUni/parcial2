/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Estudiante } from '../estudiante/estudiante.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @OneToOne(() => Estudiante)
  @JoinColumn()
  estudiante: Estudiante;
}
