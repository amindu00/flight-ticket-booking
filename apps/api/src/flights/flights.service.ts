import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
    ) { }

    findAll(): Promise<Flight[]> {
        return this.flightsRepository.find();
    }

    findOne(id: number): Promise<Flight | null> {
        return this.flightsRepository.findOneBy({ id });
    }

    async search(origin: string, destination: string, date: string): Promise<Flight[]> {
        // Basic search logic - in a real app, date comparison would be more robust
        // For now, we'll just filter by origin and destination
        // Date filtering would require handling timezones and ranges
        return this.flightsRepository.find({
            where: {
                origin,
                destination
            }
        });
    }

    create(flight: Flight): Promise<Flight> {
        return this.flightsRepository.save(flight);
    }
}
