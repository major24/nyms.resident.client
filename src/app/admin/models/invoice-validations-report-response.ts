export interface InvoiceValidationsReportResponse {
  billingCycleId: number;
  periodStartDate: string;
  periodEndDate: string;
  localAuthorityId: number;
  localAuthority: string;
  paymentTypeId: number;
  description: string;
  residentId: number;
  name: string;
  amountDue: number;
  validated: string;
  validatedAmount: number;
  updatedDate: string;
  updatedBy: string;
}