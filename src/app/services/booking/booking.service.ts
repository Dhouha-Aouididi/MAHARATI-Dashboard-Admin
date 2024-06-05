import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EventInput } from '@fullcalendar/core';

export interface Booking {
  Service: { title: string }; 
  id?: number;
  user_id: number;
  service_id: number;
  date: string; // ISO 8601 date string
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface CalendarEvent extends EventInput {
  bookingId: number; 
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  bookings$ = this.bookingsSubject.asObservable();


  constructor(private http: HttpClient) {}

  getBookings() {
    return this.http.get<Booking[]>('http://localhost:3000/bookings').pipe(
      tap(bookings => console.log('Bookings from server:', bookings)), // Log the raw response
      map(bookings => bookings.map(booking => ({
        id: booking.id.toString(),
        title: booking.Service.title,
        start: new Date(booking.date), 
        bookingId: booking.id
      }))),
      tap(mappedBookings => console.log('Mapped bookings:', mappedBookings)), // Log mapped events
      catchError(error => {
        console.error('Error fetching bookings:', error);
        return []; // Return an empty array in case of error
      }),
      tap(events => this.bookingsSubject.next(events)) // Update subject with fetched events
    );
  }

  

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`http://localhost:3000/bookings/${id}`);
  }

  acceptBooking(bookingId: number): Observable<any> {
    return this.http.put(`http://localhost:3000/bookings/${bookingId}/accept`, {});
  }

  rejectBooking(bookingId: number): Observable<any> {
    return this.http.put(`http://localhost:3000/bookings/${bookingId}/reject`, {});
  }
}
