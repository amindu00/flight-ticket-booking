import { Flight } from './flight.model';

export interface Booking {
    id: string;
    userId: string;
    flight: Flight;
    bookingDate: Date;
    status: 'confirmed' | 'cancelled';
    passengers: number;
}
