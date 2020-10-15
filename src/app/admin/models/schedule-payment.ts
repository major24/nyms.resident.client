import { InvoiceValidatedModel } from './invoice-validated-model';

export interface SchedulePayment {
  id: number;
  residentId: number;
  localAuthorityId: number;
  paymentTypeId: number;
  paymentType: string;
  paymentFrom: string;
  paymentProviderId: number;
  paymentFromName: string;
  description: string;
  scheduleBeginDate: string;
  scheduleEndDate: string;
  weeklyFee: number;
  amountDue: number;
  invoiceValidatedModel: InvoiceValidatedModel;
}
