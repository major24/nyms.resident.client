import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { InvoiceData, InvoiceValidationsReportResponse, OccupancyByDate } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService) { }

  loadOccupancyByDate(startDate: string, endDate: string): Observable<OccupancyByDate[]> {
    return this.apiService.loadOccupancyByDate(startDate, endDate);
  }

}
