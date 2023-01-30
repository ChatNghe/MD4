import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PostTag{
    @PrimaryGeneratedColumn()
    postTagId: number;
    @Column()
    post: number;
    @Column()
    tag: number;

}