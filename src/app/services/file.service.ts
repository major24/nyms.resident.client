import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private apiService: ApiService) { }

  public downloadFile(billingStart: string, billingEnd: string): Observable<any> {
    return this.apiService.downloadFile(billingStart, billingEnd);
  }
}
