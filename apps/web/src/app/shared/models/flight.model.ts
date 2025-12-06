export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    origin: string;
    destination: string;
    price: number;
    duration: string; // e.g. "2h 30m"
    stops: number;
    availableSeats: number;
}
