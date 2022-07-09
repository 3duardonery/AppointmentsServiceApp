import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreateBook } from 'src/app/shared/models/create-book';
import { CreateBookResponse } from 'src/app/shared/models/create-book-response';
import { Professional } from 'src/app/shared/models/professional';
import { ServiceJob } from 'src/app/shared/models/services-jobs';
import { BookService } from 'src/app/shared/services/book.service';
import { ProfessionalsService } from 'src/app/shared/services/professionals.service';
import { ServicesJobService } from 'src/app/shared/services/services-job.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent implements OnInit {
  servicesLoading: boolean = false;
  isSaving: boolean = false;
  services: ServiceJob[] = [];
  selectedServices: string[] = [];
  professional: Professional = {
    email: '',
    id: '',
    isEnabled: false,
    name: '',
    profilePicture: '',
    services: [],
  };
  createBookRequest: CreateBook = {
    duration: 0,
    endDate: '',
    startDate: '',
    serviceIds: [],
    endTime: '',
    professionalId: '',
    startTime: '',
  };

  haveMoreThanOneServiceSelected: boolean = false;

  createBookResponse: CreateBookResponse[] = [];

  createBookFormGroup: FormGroup = new FormGroup({});

  constructor(
    private professionalsService: ProfessionalsService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.servicesLoading = true;
    this.professionalsService
      .getAvailableProfessionalByEmail('edu.nery.cordeiro@gmail.com')
      .subscribe({
        next: (data) => {
          this.professional = data;
          this.services = this.professional.services;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.servicesLoading = false;
          this.initFormGroup();
        },
      });
  }

  initFormGroup(): void {
    this.createBookFormGroup = new FormGroup({
      professionalName: new FormControl(this.professional.name, []),
      professionalId: new FormControl(this.professional.id),
      duration: new FormControl(
        { disabled: true, value: this.createBookRequest.duration },
        []
      ),
      startDate: new FormControl(this.createBookRequest.startDate, [
        Validators.required,
      ]),
      endDate: new FormControl(this.createBookRequest.endDate, [
        Validators.required,
      ]),
      startTime: new FormControl(this.createBookRequest.startTime, [
        Validators.required,
      ]),
      endTime: new FormControl(this.createBookRequest.endTime, [
        Validators.required,
      ]),
      serviceId: new FormControl(this.createBookRequest.serviceIds, []),
    });
  }

  saveBook(): void {
    if (this.createBookFormGroup.invalid) return;

    this.createBookRequest = this.createBookFormGroup.value;
    this.createBookRequest.serviceIds = this.selectedServices;

    this.isSaving = true;

    this.bookService.saveBook(this.createBookRequest).subscribe({
      next: (data) => {
        this.createBookResponse = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isSaving = false;
      },
    });
  }

  handleServicesInRequest(event: Event, value: string): void {
    let checked = (<HTMLInputElement>event.target).checked;

    if (checked) {
      this.selectedServices.push(value);
    } else {
      this.selectedServices.splice(
        this.selectedServices.findIndex((x) => x == value),
        1
      );
    }

    if (this.selectedServices.length <= 1) {
      this.createBookFormGroup.get('duration')?.disable();
    } else {
      this.createBookFormGroup.get('duration')?.enable();
    }
  }
}
