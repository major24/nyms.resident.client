import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { Invoice } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiService: ApiService) { }

  loadInvoiceByDate(startDate: string, endDate: string): Observable<Invoice[]> {
    return this.apiService.loadInvoiceByDate(startDate, endDate);
  }
}
