import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Session from "./Session";
import Pokemon from "./Pokemon";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Session, session => session.user, { onDelete: 'CASCADE' })
  sessions: Session[];

  @ManyToMany(() => Pokemon, { onDelete: 'CASCADE' })
  @JoinTable()
  pokemons: Pokemon[];
}
