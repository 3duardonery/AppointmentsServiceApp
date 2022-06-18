import { ServiceJob } from './services-jobs';

export interface Book {
  date: string;
  bookDateStringValue?: string;
  availableHours?: AvailableHour[];
  isEnabled?: boolean;
  professionalReference?: Professional;
  serviceReferences?: ServiceJob[];
}

export interface AvailableHour {
  id: string;
  availableHour: string;
  professionalId: string;
  customerId: string;
  customerName: string;
  isCancelled: boolean;
}

export interface Professional {
  name: string;
  profilePicture: string;
}
