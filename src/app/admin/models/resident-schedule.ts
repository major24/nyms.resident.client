import { Schedule } from './schedule';

export interface ResidentSchedule {
  referenceId: string;
  localAuthorityId: number;
  paymentFromName: string;
  foreName: string;
  surName: string;
  schedules: Schedule[];
}