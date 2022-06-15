import { Component, OnInit } from '@angular/core';
import { ServiceJob } from 'src/app/shared/models/services-jobs';
import { ServicesJobService } from 'src/app/shared/services/services-job.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  loading: boolean = false;

  serviceJobs: ServiceJob[] = [];

  constructor(private _servicesJobsService: ServicesJobService) {}

  ngOnInit(): void {
    this.loading = true;
    this._servicesJobsService.getActivedServicesJobs().subscribe({
      next: (data) => {
        console.table(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
