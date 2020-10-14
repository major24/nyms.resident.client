export interface InvoiceValidatedModel {
  id: number,
  billingCycleId: number,
  paymentTypeId: number,
  amountDue: number,
  validated: string,
  validatedAmount: number,
  updatedDate: string,
  updatedBy: string
}