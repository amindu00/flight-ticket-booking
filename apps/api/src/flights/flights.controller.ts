import { Controller, Get, Param, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './flight.entity';

@Controller('flights')
export class FlightsController {
    constructor(private readonly flightsService: FlightsService) { }

    @Get()
    findAll(): Promise<Flight[]> {
        return this.flightsService.findAll();
    }

    @Get('search')
    search(
        @Query('origin') origin: string,
        @Query('destination') destination: string,
        @Query('date') date: string
    ): Promise<Flight[]> {
        return this.flightsService.search(origin, destination, date);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Flight | null> {
        return this.flightsService.findOne(+id);
    }
}
