import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { ResidentSchedule } from '../models/resident-schedule';
import { Schedule } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private apiService: ApiService) { }

  loadSchedules(): Observable<ResidentSchedule[]> {
    return this.apiService.loadSchedules();
  }

  loadSchedulesByReferenceId(referenceId: string): Observable<ResidentSchedule> {
    return this.apiService.loadSchedulesByReferenceId(referenceId);
  }

  updateScheduleEndDate(id: number, scheduleEndDate: string): Observable<any> {
    return this.apiService.updateScheduleEndDate(id, scheduleEndDate);
  }

  createSchedule(referenceId: string, schedule: Schedule): Observable<any> {
    return this.apiService.createSchedule(referenceId, schedule);
  }

  loadPaymentProviders(): Observable<any> {
    return this.apiService.loadPaymentProviders();
  }

  loadPaymentTypes(): Observable<any> {
    return this.apiService.loadPaymentTypes();
  }
}
