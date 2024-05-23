import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
