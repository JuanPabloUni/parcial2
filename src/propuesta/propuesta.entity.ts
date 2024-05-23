import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
