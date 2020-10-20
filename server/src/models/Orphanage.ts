import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Images';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    //o primeiro parametro é uma função que retorna o tipo de retorno do relaciomento
    //o segundo parametro é
        //=> de uma imagem que recebo
        //=> qual campo no objetivo imagem faz o relaciomento inverso
    @OneToMany(()=> Image, image => image.orphanage , {
        cascade: ['insert', 'update']
    })
    //indica qual campo em image contem o relacimento ou id 
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];



}