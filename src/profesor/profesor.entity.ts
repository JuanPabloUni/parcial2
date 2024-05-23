/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Propuesta } from '../propuesta/propuesta.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  numeroCedula: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  grupoInvestigacion: string;

  @Column({ type: 'int' })
  numeroExtension: number;

  @Column({ type: 'varchar', length: 255 })
  grupoDeInvestigacion: string;

  @OneToMany(() => Propuesta, propuesta => propuesta.profesor)
  propuestas: Propuesta[];
}
