import { InvoiceResident } from './invoice-resident';

export interface InvoiceData {
  id: number;
  beginDate: string;
  endDate: string;
  billingCycleId: number;
  billingDate: string;
  numberOfDays: number;
  invoiceResidents: InvoiceResident[]
}


