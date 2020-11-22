import { Injectable } from '@angular/core';
import { EnquiryResident, EnquiryAction, CareHome, Resident } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/index';

// https://stackblitz.com/edit/angular-fh1kyp?file=src%2Fapp%2Ftodo.service.ts

@Injectable({
  providedIn: 'root'
})
export class EnquiresService {
  constructor(private apiService: ApiService) {}

  loadEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    return this.apiService.getEnquiryByReferenceId(referenceId);
  }

  getEnquiresByHomeId(careHomeId: number): Observable<EnquiryResident[]> {
      return this.apiService.getEnquiresByHomeId(careHomeId);
  }

  createEnquiryResident(careHomeId: number, enqResident: EnquiryResident): Observable<EnquiryResident> {
    return this.apiService.createEnquiryResident(careHomeId, enqResident);
  }

  updateEnquiryResident(enqResident: EnquiryResident): Observable<EnquiryResident> {
    return this.apiService.updateEnquiryResident(enqResident);
  }

  loadEnquiryActions(referenceId: string): Observable<EnquiryAction[]> {
    return this.apiService.loadEnquiryActions(referenceId);
  }

  saveEnquiryActions(referenceId: string, enquiryActions: EnquiryAction[]): Observable<EnquiryAction[]> {
    return this.apiService.saveEnquiryActions(referenceId, enquiryActions);
  }

  loadCareHomeDetailByEnquiryReferenceId(referenceId: string): Observable<CareHome> {
    return this.apiService.loadCareHomeDetailByEnquiryReferenceId(referenceId);
  }

  admitResident(referenceId: string, resident: Resident): Observable<Resident> {
    return this.apiService.admitResident(referenceId, resident);
  }

}
