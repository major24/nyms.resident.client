import { Injectable } from '@angular/core';
import { ApiService } from '../../services/index';
import { Observable } from 'rxjs';
import { CareHome } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarehomeService {

  constructor(private apiService: ApiService) { }

  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.apiService.loadAllCareHomeDetails();
  }


}
