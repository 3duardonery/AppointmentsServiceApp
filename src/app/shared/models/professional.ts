import { ServiceJob } from './services-jobs';

export interface Professional {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  isEnabled: boolean;
  services: ServiceJob[];
}
