import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Booking]), AuthModule],
    providers: [BookingsService],
    controllers: [BookingsController],
    exports: [BookingsService]
})
export class BookingsModule { }
