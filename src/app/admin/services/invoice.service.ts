import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { InvoiceData, BillingCycle, InvoiceValidatedRequest, InvoiceCommentsRequest, InvoiceValidationsReportResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService: ApiService) { }

  loadInvoiceByDate(startDate: string, endDate: string): Observable<InvoiceData> {
    return this.apiService.loadInvoiceByDate(startDate, endDate);
  }

  loadValidationsDataByDate(startDate: string, endDate: string): Observable<InvoiceValidationsReportResponse[]> {
    return this.apiService.loadValidationsDataByDate(startDate, endDate);
  }

  loadBillingCycles(): Observable<BillingCycle[]> {
    return this.apiService.loadBillingCycles();
  }

  loadInvoiceByBillingCycle(localAuthorityId: number, billingCycleId: number): Observable<InvoiceData> {
    return this.apiService.loadInvoiceByBillingCycle(localAuthorityId, billingCycleId);
  }

  updateInvoicePaymentsWithValidation(invoiceValidatedRequests: InvoiceValidatedRequest[]): Observable<any> {
    return this.apiService.updateInvoicePaymentsWithValidation(invoiceValidatedRequests);
  }

  insertInvoiceComment(invoiceCommentRequest: InvoiceCommentsRequest): Observable<any> {
    return this.apiService.insertInvoiceComment(invoiceCommentRequest);
  }

}
