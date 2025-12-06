import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Flight } from '../flights/flight.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Flight, (flight) => flight.id)
    flight: Flight;

    @Column()
    flightId: number;

    @Column()
    bookingDate: Date;

    @Column()
    status: string; // 'confirmed', 'cancelled'

    @Column()
    passengers: number;
}
