import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AvailableHour, Book } from 'src/app/shared/models/books';
import { CreateAppointment } from 'src/app/shared/models/create-appointment';
import { ServiceJob } from 'src/app/shared/models/services-jobs';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';
import { BookService } from 'src/app/shared/services/book.service';
import { ServicesJobService } from 'src/app/shared/services/services-job.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  createAppointmentFormGroup: FormGroup = new FormGroup({});
  loading: boolean = false;

  serviceJobs: ServiceJob[] = [];
  books: Book[] = [];

  availableDates: string[] = [];
  availableHours: AvailableHour[] = [];

  createAppointmentObject: CreateAppointment = {};
  needToSelectTimeValue: boolean = true;

  @ViewChild('create_appointment_confirmation', { static: true })
  modalElement!: ElementRef<HTMLDivElement>;
  modal: Modal | null = null;

  constructor(
    private _servicesJobsService: ServicesJobService,
    private _bookService: BookService,
    private appointmentService: AppointmentsService
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

  ngOnInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement, {});

    this.createAppointmentFormGroup = new FormGroup({
      service: new FormControl(this.createAppointmentObject.serviceId, [
        Validators.required,
      ]),
      date: new FormControl(this.createAppointmentObject.date, [
        Validators.required,
      ]),
      customerId: new FormControl(this.createAppointmentObject.customerId, [
        Validators.required,
      ]),
      customerName: new FormControl(this.createAppointmentObject.customerName, [
        Validators.required,
      ]),
    });
  }

  getBooksByServiceId(event: any): void {
    let serviceId = event.target.value;

    this.createAppointmentObject.serviceId = serviceId;

    this._bookService.getBooksByServiceId(serviceId).subscribe({
      next: (data) => {
        console.table(data);
        this.books = data;
        this.availableDates = data.map((value) => {
          return new Date(value.date).toISOString().split('T')[0];
        });
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

    this.createAppointmentObject.date = selectedDate.split('T')[0];

    this.availableHours =
      this.books.filter((date) => date.date === selectedDate)[0]
        .availableHours ?? [];
  }

  selectTime(hour: string): void {
    this.createAppointmentObject.time = hour;
    this.needToSelectTimeValue = false;
  }

  save(): void {
    if (this.createAppointmentFormGroup.invalid) return;

    this.createAppointmentObject.customerId =
      this.createAppointmentFormGroup.get('customerId')?.value;
    this.createAppointmentObject.customerName =
      this.createAppointmentFormGroup.get('customerName')?.value;

    this.appointmentService
      .saveAnAppointment(this.createAppointmentObject)
      .subscribe({
        next: (response) => {
          this.modal?.show();
          this.createAppointmentFormGroup.reset();
          this.availableDates = [];
          this.availableHours = [];
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('finalizou');
        },
      });
  }
}
