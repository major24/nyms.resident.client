import { Schedule } from './schedule';

export interface Invoice {
  id: number;
  name: string;
  totalLaFee: number;
  residentWeeklyFee: number;
  grandTotal: number;
  localAuthorityId?: number;
  schedules: Schedule[];
  numberOfDays: number;
}

export interface InvoiceSummary {
  localAuthority: string;
  totalLaFee: number;
}