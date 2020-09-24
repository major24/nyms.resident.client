import { Injectable } from '@angular/core';
import { EnquiryResident } from '../models';
import { Observable } from 'rxjs';
import { Store } from '../../helpers/store';
import { ApiService } from '../../services/index';
import { map } from 'rxjs/operators';

// https://stackblitz.com/edit/angular-fh1kyp?file=src%2Fapp%2Ftodo.service.ts

@Injectable({
  providedIn: 'root'
})
export class EnquiresService extends Store<EnquiryResident[]> {

  constructor(private apiService: ApiService) {
    super([]);
  }

  // loadEnquiresAll(): Observable<EnquiryResident[]> {
  //   return this.apiService.getEnquiresAll();
  //   // .pipe(
  //   //   map((enqs) => {
  //   //     this.setState(enqs);
  //   //     return enqs;
  //   //   })
  //   // );
  // }

  loadEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    return this.apiService.getEnquiryByReferenceId(referenceId);
  }

  getEnquiresByHomeId(careHomeId: number): Observable<EnquiryResident[]> {
      return this.apiService.getEnquiresByHomeId(careHomeId);
      
    //return this.apiService.getEnquiresByHomeId(careHomeId);
    // .pipe(
    //   map((enqs) => {
    //     this.setState(enqs);
    //     return enqs;
    //   })
    // );
  }

  createEnquiryResident(careHomeId: number, enqResident: EnquiryResident): Observable<EnquiryResident> {
    return this.apiService.createEnquiryResident(careHomeId, enqResident);
  }



  // loadEnquires(): void {
  //   this.http.get<EnquiryResident[]>(`/api/users`)
  //   .subscribe(data => {
  //     console.log('>>>>from api', data);
  //     this.setState(data);
  //   },
  //   error => {
  //     console.log('Error getting enquiry residents api. ', error);
  //   });
  // }

  // create(enquiryResident: EnquiryResident): void {
  //   this.http.get<EnquiryResident[]>(`https://jsonplaceholder.typicode.com/users`)
  //   .subscribe(data => {
  //     console.log('>>>>from api', data);
  //     this.setState(data);
  //   },
  //   error => {
  //     console.log('Error getting enquiry residents api. ', error);
  //   });
  // }


}





// export class EnquiresService {
//   private _enquiryResidents$ =  new BehaviorSubject<EnquiryResident[]>([]);
//   readonly enquiryResidents = this._enquiryResidents$.asObservable();
//   private dataStore: { enquiryResidents: EnquiryResident[] } = { enquiryResidents: [] };

//   constructor(private http: HttpClient) { // , private enquiryStore: EnquiryStore
//     // this.enquiryResidents$ = new BehaviorSubject<EnquiryResident[]>([]);
//     // this.enquiryResidents = this.enquiryResidents$.asObservable();
//    }

//   loadAll() {
//     this.http.get<EnquiryResident[]>(`${environment.apiDomainUrl}/api/carehomes/1/enquires`)
//     .subscribe(data => {
//       this.dataStore.enquiryResidents = data;
//       this._enquiryResidents$.next(Object.assign({}, this.dataStore).enquiryResidents);
//       // this.enquiryStore.enquires = data;
//       // //Object.assign(this.dataStore.enquiryResidents, data);
//       // console.log('>>==', this.enquiryStore.enquires);
//       // this.enquiryStore.enquiryResidents.subscribe(k => {
//       //   Object.assign(this.dataStore.enquiryResidents, k);
//       //   console.log('====k=', k);
//       // })
//       //this.enquiryStore.enquiryResidents.subscribe
//     }, error => console.log('Could not load enquires.'));
//   }

//   create(enqResident: EnquiryResident) {
//     // this.http.post<Todo>(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(data => {
//     //   this.dataStore.todos.push(data);
//     //   this._todos.next(Object.assign({}, this.dataStore).todos);
//     // }, error => console.log('Could not create todo.'));

//     this.dataStore.enquiryResidents.push(enqResident);
//   }

//   getResident(id: number): EnquiryResident {
//     if (this.dataStore.enquiryResidents.length > 0) {
//       return this.dataStore.enquiryResidents.find(r => r.id === id);
//     }
//   }

//   update(enquiry: EnquiryResident) {
//     let xx = this.dataStore.enquiryResidents.map((e) => {
//       if (e.id === enquiry.id) {
//         return enquiry;
//       } else {
//         return e;
//       }
//     });
//     this._enquiryResidents$.next(Object.assign({}, xx));
//     // this.http.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo)).subscribe(data => {
//     //   this.dataStore.todos.forEach((t, i) => {
//     //     if (t.id === data.id) { this.dataStore.todos[i] = data; }
//     //   });

//     //   this._todos.next(Object.assign({}, this.dataStore).todos);
//     // }, error => console.log('Could not update todo.'));
//   }

//   remove(id: number) {
//     // this.dataStore.enquiryResidents.forEach((t, i) => {
//     //       if (t.id === id) {
//     //         this.dataStore.enquiryResidents.splice(i, 1);
//     //       }
//     //     });
//     // this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(response => {
//     //   this.dataStore.todos.forEach((t, i) => {
//     //     if (t.id === todoId) { this.dataStore.todos.splice(i, 1); }
//     //   });

//     //   this._todos.next(Object.assign({}, this.dataStore).todos);
//     // }, error => console.log('Could not delete todo.'));
//   }

// }
