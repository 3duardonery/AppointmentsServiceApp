import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/books';
import { CreateAppointment } from 'src/app/shared/models/create-appointment';
import { ServiceJob } from 'src/app/shared/models/services-jobs';
import { BookService } from 'src/app/shared/services/book.service';
import { ServicesJobService } from 'src/app/shared/services/services-job.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  loading: boolean = false;

  serviceJobs: ServiceJob[] = [];
  books: Book[] = [];

  availableDates: string[] = [];
  availableHours: string[] = [];

  createAppointmentObject: CreateAppointment = {};

  constructor(
    private _servicesJobsService: ServicesJobService,
    private _bookService: BookService
  ) {
    this.loading = true;
    this._servicesJobsService.getActivedServicesJobs().subscribe({
      next: (data) => {
        console.table(data);
        this.serviceJobs = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnInit(): void {}

  getBooksByServiceId(event: any): void {
    let serviceId = event.target.value;

    this.createAppointmentObject.serviceId = serviceId;

    this._bookService.getBooksByServiceId(serviceId).subscribe({
      next: (data) => {
        console.table(data);
        this.books = data;
        this.availableDates = data.map((value) => {
          return value.bookDateStringValue;
        });

        console.log(this.availableDates);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getAvailableHoursByServiceId(event: any): void {
    let selectedDate = event.target.value;

    this.createAppointmentObject.date = selectedDate;

    console.log(this.createAppointmentObject);

    this.availableHours =
      this.books
        .filter((date) => date.bookDateStringValue === selectedDate)[0]
        .availableHours.map((hour) => hour.availableHour) ?? [];
  }

  selectTime(hour: string): void {
    let time = hour;
    console.log(time);
  }
}
