import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User, CareHomeUser } from '../models/index';
import { EnquiryResident, CareHome } from '../residents/models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // === User related ===
  authenticateUser(username: string, password: string): Observable<User> {
    //console.log('in api service. authenticateUser');
    return this.http.post<any>(
      `/api/authentication/authenticate`,
      { username, password },
      { withCredentials: true }
    );
    // .post<any>(
    //   `${environment.apiDomainUrl}/api/authentication/authenticate`,
    //   { username, password },
    //   { withCredentials: true }
    // );
  }

  // change to ref id later
  // getUserById(id: number): Observable<User> {
  getCareHomeUserByReferenceId(referenceId: string): Observable<CareHomeUser> {
    return this.http.get<CareHomeUser>(
      `/api/users/carehomeusers/${referenceId}`,
      { withCredentials: true }
    );
    // return this.http.get<CareHomeUser>(
    //   `${environment.apiDomainUrl}/api/users/carehomeusers/${referenceId}`,
    //   { withCredentials: true }
    // );
  }
  //=== endof user related ===

  // === enquires related ===
  getEnquiresAll(): Observable<EnquiryResident[]> {
    return this.http.get<EnquiryResident[]>(
      `/api/carehomes/enquires`
    );
  }

  getEnquiresByHome(careHomeId: number): Observable<EnquiryResident[]> {
    return this.http.get<EnquiryResident[]>(
      `/api/carehomes/${careHomeId}/enquires`
    );
  }

  getEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    return this.http.get<EnquiryResident>(
      `/api/enquires/${referenceId}`
    );
  }

  createEnquiryResident(enqResident: EnquiryResident) {
    return this.http.post<any>(
      `/api/enquires`,
      enqResident
    );
  }

  updateEnquiryResident(enqResident: EnquiryResident) {
    return this.http.put<EnquiryResident>(
      `/api/enquires/${enqResident.referenceId}`,
      enqResident
    );
  }
  // === endof enquires ===



  // === resident related ===


  // === endof resident related ===




  // === care home lookup values ===
  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.http.get<CareHome[]>(`/api/carehomes/details`);
  }


  // === endof carehome lookup values ===











}
