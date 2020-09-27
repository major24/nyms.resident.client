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