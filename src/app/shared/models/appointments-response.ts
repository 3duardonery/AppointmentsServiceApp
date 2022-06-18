import { ServiceJob } from './services-jobs';

export interface AppointmentResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  time: string;
  executed: boolean;
  isCancelled: boolean;
  customerId: string;
  customerName: string;
  serviceReference: ServiceJob;
}
