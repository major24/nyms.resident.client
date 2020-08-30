import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/index';
import { EnquiryResident } from '../residents/models/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // === User related ===
  authenticateUser(username: string, password: string): Observable<User> {
    //console.log('in api service. authenticateUser');
    return this.http
    .post<any>(
      `${environment.apiDomainUrl}/api/authentication/authenticate`,
      { username, password },
      { withCredentials: true }
    );
  }

  // change to ref id later
  // getUserById(id: number): Observable<User> {
  getUserByReferenceId(referenceId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiDomainUrl}/api/users/${referenceId}`);
  }
  //=== endof user related ===


  // === enquires related ===
  getEnquiresAll(): Observable<EnquiryResident[]> {
    return this.http.get<EnquiryResident[]>(`${environment.apiDomainUrl}/api/carehomes/enquires`);
  }

  getEnquiresByHome(careHomeId: number): Observable<EnquiryResident[]> {
    return this.http.get<EnquiryResident[]>(`${environment.apiDomainUrl}/api/carehomes/${careHomeId}/enquires`);
  }

  getEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    return this.http.get<EnquiryResident>(`${environment.apiDomainUrl}/api/enquires/${referenceId}`);
  }

  createEnquiryResident(enqResident: EnquiryResident) {
    return this.http.post<any>(`${environment.apiDomainUrl}/api/enquires`, enqResident);
  }

  updateEnquiryResident(enqResident: EnquiryResident) {
    return this.http.put<EnquiryResident>(`${environment.apiDomainUrl}/api/enquires/${enqResident.referenceId}`, enqResident);
  }

  // temp
  // createEnquiryResident222(enqResident: EnquiryResident) {
  //   console.log('>>=>>', enqResident);
  //   return this.http.post<any>(`${environment.apiDomainUrl}/api/myfinace/tran`, enqResident
  //     //{ id: 33, surName: "Nalliah" }
  //   );
  // }
  //api/myfinace/tran
  // === endof enquires ===




}
