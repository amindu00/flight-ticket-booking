import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FlightsService } from './flights/flights.service';
import { Flight } from './flights/flight.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const flightsService = app.get(FlightsService);
  // const usersService = app.get(UsersService); // We might need to add create method to UsersService

  console.log('Seeding flights...');
  const flights: Partial<Flight>[] = [
    {
      airline: 'TechAir',
      flightNumber: 'TA101',
      departureTime: new Date('2025-12-01T10:00:00Z'),
      arrivalTime: new Date('2025-12-01T12:00:00Z'),
      origin: 'New York',
      destination: 'London',
      price: 500,
      duration: '7h',
      stops: 0,
      availableSeats: 150,
    },
    {
      airline: 'TechAir',
      flightNumber: 'TA102',
      departureTime: new Date('2025-12-02T14:00:00Z'),
      arrivalTime: new Date('2025-12-02T16:00:00Z'),
      origin: 'London',
      destination: 'New York',
      price: 550,
      duration: '7h 30m',
      stops: 0,
      availableSeats: 140,
    },
    {
      airline: 'DevJet',
      flightNumber: 'DJ202',
      departureTime: new Date('2025-12-05T09:00:00Z'),
      arrivalTime: new Date('2025-12-05T11:00:00Z'),
      origin: 'San Francisco',
      destination: 'Tokyo',
      price: 800,
      duration: '11h',
      stops: 1,
      availableSeats: 200,
    },
  ];

  for (const flight of flights) {
    await flightsService.create(flight as Flight);
  }

  console.log('Seeding complete!');
  await app.close();
}
void bootstrap();
