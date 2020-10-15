export interface Schedule {
  id: number;
  residentId: number;
  localAuthorityId: number;
  paymentProviderId: number;
  paymentTypeId: number;
  paymentFromName: string;
  description: string;
  scheduleBeginDate: string;
  scheduleEndDate: string;
  weeklyFee: number;
  amountDue: number;
}