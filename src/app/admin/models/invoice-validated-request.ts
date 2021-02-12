export interface InvoiceValidatedRequest {
  id: number;
  scheduleId: number;
  localAuthorityId: number;
  billingCycleId: number;
  residentId: number;
  paymentTypeId: number;
  amountDue: number;
  validated: string;
}