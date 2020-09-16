import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/index';
import { Resident } from '../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidentsService {
  constructor(private apiService: ApiService) {}

  getAllResidents(careHomeId: number): Observable<Resident[]> {
    return this.apiService.getAllResidents(careHomeId);
  }

  updateExitDate(referenceId: string, exitDate: string): Observable<any> {
    return this.apiService.updateExitDate(referenceId, exitDate);
  }
}
