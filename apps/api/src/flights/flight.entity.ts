import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    airline: string;

    @Column()
    flightNumber: string;

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column()
    price: number;

    @Column()
    duration: string;

    @Column()
    stops: number;

    @Column()
    availableSeats: number;
}
