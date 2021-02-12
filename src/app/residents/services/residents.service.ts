import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/index';
import { Resident, CareHome } from '../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidentsService {
  constructor(private apiService: ApiService) { }

  getAllResidents(careHomeId: number): Observable<Resident[]> {
    return this.apiService.getAllResidents(careHomeId);
  }

  loadResidentByReferenceId(referenceId: string): Observable<Resident> {
    return this.apiService.loadResidentByReferenceId(referenceId);
  }

  dischargeResident(referenceId: string, exitDate: string): Observable<any> {
    return this.apiService.dischargeResident(referenceId, exitDate);
  }

  loadCareHomeDetailByResidentReferenceId(referenceId: string): Observable<CareHome> {
    return this.apiService.loadCareHomeDetailByResidentReferenceId(referenceId);
  }
}
