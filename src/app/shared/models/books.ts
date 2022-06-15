export interface Book {
  date: string;
  bookDateStringValue: string;
  availableHours: AvailableHour[];
  isEnabled: boolean;
  professionalReference: Professional;
}

export interface AvailableHour {
  id: string;
  availableHour: string;
  professionalId: string;
  customerId: string;
  isCancelled: boolean;
}

export interface Professional {
  name: string;
  profilePicture: string;
}
