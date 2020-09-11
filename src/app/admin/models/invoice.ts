export interface Schedule {
  residentId: number;
  localAuthorityId: number;
  paymentType: string;
  paymentFrom: string;
  paymentFromName: string;
  description: string;
  scheduleBeginDate: string;
  scheduleEndDate: string;
  weeklyFee: number;
  amountDue: number;
}

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