import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    postId: number;
    @Column({type: "text"})
    title: string;
    @Column({type: "text"})
    content: string;
    @Column({type: "text"})
    image: string;
    @Column({type: "varchar",length: 255})
    date: string;
    @Column()
    user: number;

}