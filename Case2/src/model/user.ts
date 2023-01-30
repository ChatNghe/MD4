import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId: number;
    @Column({type: "varchar",length: 255})
    username: string
    @Column({type: "varchar",length: 255})
    password: string
    @Column({type: "varchar",length: 255})
    role: string
    @Column({type: "varchar",length: 255})
    status: string
}