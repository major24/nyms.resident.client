export interface Schedule {
  id: number;
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