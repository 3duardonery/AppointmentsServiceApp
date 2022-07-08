import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreateBook } from 'src/app/shared/models/create-book';
import { Professional } from 'src/app/shared/models/professional';
import { ServiceJob } from 'src/app/shared/models/services-jobs';
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

  createBookFormGroup: FormGroup = new FormGroup({});

  constructor(private professionalsService: ProfessionalsService) {}

  ngOnInit(): void {
    this.servicesLoading = true;
    this.professionalsService
      .getAvailableProfessionalByEmail('edu.nery.cordeiro@gmail.com')
      .subscribe({
        next: (data) => {
          this.professional = data;
          console.log(this.professional);
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
      slot: new FormControl(this.createBookRequest.duration, [
        Validators.required,
      ]),
      startDate: new FormControl(this.createBookRequest.startDate),
      endDate: new FormControl(this.createBookRequest.endDate),
      startTime: new FormControl(this.createBookRequest.startTime),
      endTime: new FormControl(this.createBookRequest.endTime),
      serviceId: new FormControl(this.createBookRequest.serviceIds),
    });
  }

  saveBook(): void {
    if (this.createBookFormGroup.invalid) return;

    this.createBookRequest = this.createBookFormGroup.value;
    this.createBookRequest.serviceIds = this.selectedServices;
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
  }
}
