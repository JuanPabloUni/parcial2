import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
