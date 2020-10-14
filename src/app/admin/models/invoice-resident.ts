import { SchedulePayment } from './schedule-payment';

export interface InvoiceResident {
  id: number;
  name: string;
  totalLaFee: number;
  residentWeeklyFee: number;
  grandTotal: number;
  localAuthorityId?: number;
  schedulePayments: SchedulePayment[];
  numberOfDays: number;
}