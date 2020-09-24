import { Component, OnInit } from '@angular/core';
import { EnquiryResident } from '../models/enquiry.resident';;
import { EnquiresService } from '../services';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
//import { setTimeout } from 'timers';

@Component({
  selector: 'app-enquires',
  templateUrl: './enquires.component.html',
  styleUrls: ['./enquires.component.css']
})
export class EnquiresComponent implements OnInit {
  //private _enquiryResidents$: BehaviorSubject<EnquiryResident[]> = new BehaviorSubject<EnquiryResident[]>([]);
  //public enquiryResidents$ = this._enquiryResidents$.asObservable();
  enquiryResidents: EnquiryResident[] = [];
  // enquiryResidents$: Observable<EnquiryResident[]>;
  isLoading: boolean = false;

  constructor(private enquiresService: EnquiresService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('>>ngonit-enqcomp ', this.enquiryResidents.length);
    this.isLoading = true;
    // console.log('>>>>', this._enquiryResidents$.getValue());
    // todo: need to build in flexibility to get enq by home id.
    // for now return all enqs
    // in server, validate user role and return only allowed carehomes
    setTimeout(() => {

      this.enquiresService.getEnquiresByHomeId(1)
      .subscribe({
        next: (data) => {
          console.log('>>', data);
          //this._enquiryResidents$.next(data);
          this.enquiryResidents = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Error loading enquires');
        }
      });


    }, 3000);




  }

  // ngOnInit(): void {
  //   //console.log('ngonit-enq');
  //   this.enquiryResidents$ = this.enquiresService.getState();
  //   // console.log('>>>', this.enquiresService.getValue());
  //   // console.log('>>>', this.enquiryResidents$);
  //   if (this.enquiresService.getValue() && this.enquiresService.getValue().length === 0) {
  //     this.isLoading = true;
  //     this.enquiresService.loadEnquiresAll()
  //     .subscribe(data => {
  //         // console.log('enquiries:', data);
  //         this.isLoading = false;
  //       },
  //       error => { console.log('>>>Error getting all enquires'); }
  //     )
  //   }
  // }

  navToAddEnquiry(): void {
    this.router.navigate(['/enquires-add']);
  }


}














// onSubmit() {
//   // // this.enquiresService.create({ value: this.todoForm.controls.todo.value });
//   // let x = new EnquiryResident();
//   // x.referenceId = '54544';
//   // x.firstName = 'new enq fname';
//   // x.surName = 'new enq surname';

//   // this.enquiresService.create(x);
// }

// //update(enquiry: EnquiryResident) {

//   // this.http.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo)).subscribe(data => {
//   //   this.dataStore.todos.forEach((t, i) => {
//   //     if (t.id === data.id) { this.dataStore.todos[i] = data; }
//   //   });

//   //   this._todos.next(Object.assign({}, this.dataStore).todos);
//   // }, error => console.log('Could not update todo.'));
// //}

// remove(id: number) {
//   // this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(response => {
//   //   this.dataStore.todos.forEach((t, i) => {
//   //     if (t.id === todoId) { this.dataStore.todos.splice(i, 1); }
//   //   });

//   //   this._todos.next(Object.assign({}, this.dataStore).todos);
//   // }, error => console.log('Could not delete todo.'));
// }
