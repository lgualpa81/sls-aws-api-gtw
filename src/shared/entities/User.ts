import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  first_name!: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar", {
    unique: true,
    length: 10,
  })
  document_number: string;

  @Column("varchar", {
    unique: true,
    length: 100,
  })
  email: string;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "boolean", nullable: false, default: true })
  vaccine_status: boolean;

  @Column({ type: "timestamp", nullable: true })
  vaccine_date: Date;

  @Column({
    type: "enum",
    enum: ["Sputnik", "AstraZeneca", "Pfizer", "Jhonson&Jhonson"],
    nullable: true,
  })
  vaccine_type: string;

  @Column({ type: "integer", nullable: true })
  vaccine_dose: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
