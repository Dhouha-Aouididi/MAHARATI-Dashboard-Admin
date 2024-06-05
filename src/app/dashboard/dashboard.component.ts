import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Booking, BookingService } from '../services/booking/booking.service';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild(BookingModalComponent) bookingModal!: BookingModalComponent;

  calendarOptions: CalendarOptions = {
    height: 'auto',
    contentHeight: 300,
    aspectRatio: 1.35,
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],  
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    // Subscribe to the bookings observable from the service
    this.bookingService.bookings$.subscribe({
      next: (bookings) => {
        console.log('Bookings received:', bookings); // Log fetched bookings
        this.calendarOptions.events = bookings; // Update the calendar events
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        // Handle the error here (e.g., display an error message to the user)
      }
    });

    // Fetch the initial bookings data
    this.bookingService.getBookings(); 
  }

  ngAfterViewInit() {
    // Additional initialization or actions on the calendar after it's rendered
    if (this.calendarComponent) {
      console.log('Calendar component initialized:', this.calendarComponent);
    } else {
      console.error('Calendar component not found.');
    }
  }

  handleEventClick(info) {
    const bookingId = parseInt(info.event.id!, 10); 
    this.bookingService.getBookingById(bookingId).subscribe(booking => {
      this.bookingModal.booking = booking;
      this.bookingModal.show(); 
    });
  }

  acceptBooking(booking: Booking) {
    this.bookingService.acceptBooking(booking.id!).subscribe(() => {
      // Refresh bookings from the service after accepting
      this.bookingService.getBookings(); 
      this.bookingModal.hide();
    });
  }

  rejectBooking(booking: Booking) {
    this.bookingService.rejectBooking(booking.id!).subscribe(() => {
      // Refresh bookings from the service after rejecting
      this.bookingService.getBookings();
      this.bookingModal.hide(); 
    });
  }
}