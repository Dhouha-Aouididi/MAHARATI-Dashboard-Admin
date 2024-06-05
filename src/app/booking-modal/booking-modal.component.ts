import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Booking } from '../services/booking/booking.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements AfterViewInit {
  @Input() booking: Booking | null = null;
  @Output() accept = new EventEmitter<Booking>();
  @Output() reject = new EventEmitter<Booking>();

  private modal?: Modal; 

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const modalElement = this.elementRef.nativeElement.querySelector('#bookingModal');
    if (modalElement) {
      this.modal = new Modal(modalElement);
    }
  }

  show() {
    if (this.modal) {
      this.modal.show();
    }
  }

  hide() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  acceptBooking() {
    if (this.booking) {
      this.accept.emit(this.booking);
    }
  }

  rejectBooking() {
    if (this.booking) {
      this.reject.emit(this.booking);
    }
  }
}
