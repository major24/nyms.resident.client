export interface Schedule {
  residentId: number;
  localAuthorityId: number;
  paymentType: string;
  paymentFrom: string;
  description: string;
  scheduleBeginDate: undefined;
  scheduleEndDate: undefined;
  weeklyFee: number;
  amountDue: number;
}

export interface Invoice {
  id: number;
  referenceId: string;
  name: string;
  schedules: Schedule[];
  totalLaFee: number;
}