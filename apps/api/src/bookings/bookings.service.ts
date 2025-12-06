import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
    ) { }

    findAll(): Promise<Booking[]> {
        return this.bookingsRepository.find({ relations: ['flight', 'user'] });
    }

    findByUser(userId: number): Promise<Booking[]> {
        return this.bookingsRepository.find({
            where: { userId },
            relations: ['flight']
        });
    }

    findOne(id: number): Promise<Booking | null> {
        return this.bookingsRepository.findOne({
            where: { id },
            relations: ['flight', 'user']
        });
    }

    create(booking: Partial<Booking>): Promise<Booking> {
        const newBooking = this.bookingsRepository.create({
            ...booking,
            bookingDate: new Date(),
            status: 'confirmed'
        });
        return this.bookingsRepository.save(newBooking);
    }

    async cancel(id: number): Promise<void> {
        await this.bookingsRepository.update(id, { status: 'cancelled' });
    }
}
