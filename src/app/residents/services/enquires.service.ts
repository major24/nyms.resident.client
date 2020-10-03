import { Injectable } from '@angular/core';
import { EnquiryResident } from '../models';
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

}
