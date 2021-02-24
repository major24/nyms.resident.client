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

  getActiveResidents(careHomeId: number): Observable<Resident[]> {
    return this.apiService.getActiveResidents(careHomeId);
  }

  loadResidentByReferenceId(referenceId: string): Observable<Resident> {
    return this.apiService.loadResidentByReferenceId(referenceId);
  }

  updateResident(referenceId: string, resident: Resident, ): Observable<Resident> {
    return this.apiService.updateResident(referenceId, resident);
  }

  dischargeResident(referenceId: string, exitDate: string): Observable<any> {
    return this.apiService.dischargeResident(referenceId, exitDate);
  }

  activateResident(referenceId: string): Observable<any> {
    return this.apiService.activateResident(referenceId);
  }

  loadCareHomeDetailByResidentReferenceId(referenceId: string): Observable<CareHome> {
    return this.apiService.loadCareHomeDetailByResidentReferenceId(referenceId);
  }
}
