export interface Schedule {
  residentId: number;
  localAuthorityId: number;
  paymentTypeId: number;
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
  schedules: Schedule[];
}