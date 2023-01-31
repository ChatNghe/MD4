import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:"text"})
    name: string
    @Column({type:"int"})
    price: number
    @Column({type:"text"})
    image: string
    @Column()
    category: number
}

