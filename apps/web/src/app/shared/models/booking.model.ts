import { Flight } from './flight.model';

import { BookingStatus } from './enums';

export interface Booking {
  id: number;
  userId: number;
  passengerId: number;
  flightId: number;
  flight: Flight;
  seatId: number;
  fareId: number;
  status: BookingStatus;
  pricePaid: number;
  bookingDate: Date;
}
