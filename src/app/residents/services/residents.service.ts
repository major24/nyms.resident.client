import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
//import { Resident } from '../../models'; // '@app/models';

@Injectable({
  providedIn: 'root',
})
export class ResidentsService {
  constructor(private http: HttpClient) {}

  // getAll() {
  //   return this.http.get<Resident[]>(
  //     `${environment.apiDomainUrl}/api/residents`
  //   );
  // }
}
