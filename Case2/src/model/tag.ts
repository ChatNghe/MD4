import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Tag{
    @PrimaryGeneratedColumn()
    tagId: number;
    @Column({type: "varchar",length: 255})
    tagName: string;
}