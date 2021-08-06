import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("sessions")
export default class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
  date: Date;

  @ManyToOne(() => User, user => user.sessions)
  user: User;
}