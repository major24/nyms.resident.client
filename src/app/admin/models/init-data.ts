import { InvoiceData } from './invoice-data';
import { InvoiceResident } from './invoice-resident';
import { SchedulePayment } from './schedule-payment';
import { InvoiceValidatedModel } from './invoice-validated-model';

export class InvoiceValidatedModelInit implements InvoiceValidatedModel {
  id: 0;
  billingCycleId: 0;
  paymentTypeId: 0;
  amountDue: 0;
  validated: '';
  validatedAmount: 0;
  updatedDate: '';
  updatedBy: ''
};

export class SchedulePaymentInit implements SchedulePayment {
  id: 0;
  residentId: 0;
  localAuthorityId: 0;
  paymentTypeId: 0;
  paymentType: '';
  paymentFrom: '';
  paymentFromName: '';
  paymentProviderId:0;
  description: '';
  scheduleBeginDate: '';
  scheduleEndDate: '';
  weeklyFee: 0;
  amountDue: 0;
  invoiceValidatedModel: InvoiceValidatedModelInit
}

const SchedulePaymentsInit: SchedulePayment[] = [ new SchedulePaymentInit() ];

export class InvoiceResidentInit implements InvoiceResident {
  id: 0;
  name: '';
  totalLaFee: 0;
  residentWeeklyFee: 0;
  grandTotal: 0;
  localAuthorityId: 0;
  schedulePayments: []
  numberOfDays: 0
}

const InvoiceResidentsInit: InvoiceResident[] = [ new InvoiceResidentInit() ];

export class InvoiceDataInit implements InvoiceData {
  id: 0;
  beginDate: '';
  endDate: '';
  billingCycleId: 0;
  billingDate: '';
  numberOfDays: 0;
  invoiceResidents: []
}
