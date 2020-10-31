import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnquiryAction } from '../../models/index';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiresService } from '../../services/index';

@Component({
  selector: 'enquiry-actions',
  templateUrl: './enquiry-actions.component.html',
  styleUrls: ['./enquiry-actions.component.css']
})
export class EnquiryActionsComponent implements OnInit {
  enquiryActions: EnquiryAction[] = [];
  referenceId: string = '';
  action: string = '';
  actionDate: Date = undefined;
  response: string = '';
  statusPending = 'pending';
  statusCompleted = 'completed';
  statusCompletedForUI = '_completing';

  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private enquiresService: EnquiresService,) { }

  actionForm = new FormGroup({
    action: new FormControl(''),
    actionDate: new FormControl(''),
    response: new FormControl(''),
    actionComplete: new FormControl('')
  });

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        // this.isUpdatingResident = true;
        this.enquiresService.loadEnquiryActions(this.referenceId)
        .subscribe({
          next: (data) => {
            this.enquiryActions = data;
           },
           error: (error) => {
             console.log('Error loading enquiry actions', error);
           }
        })
      }
    });
  }


  onActionChange(event: any): void {
    this.action = event.target.value;
  }

  onActionResponseAddChange(event: any): void {
    this.response = event.target.value;
  }

  onActionDateChange(event: any): void {
    this.actionDate = this.convertToJsDate(event);
  }

  onActionResponseChange(event: any, id: number): void {
    this.enquiryActions.map(e => {
      if (e.id === id) {
        e.response = event.target.value;
      }
    });
  }

  onActionComplete(event: any, id: number): void {
    this.enquiryActions.map(e => {
      if (e.id === id) {
        if (event.target.checked) {
          e.status = this.statusCompletedForUI;
        } else {
          e.status = this.statusPending;
        }
      }
    });
  }

  addAction(): void {
    // DEFAULT to pending. to be discussed
    // When adding from UI, add negative id, so we can track and update responses associated with it
    let nNum = (this.enquiryActions.length + 4) * -1
    const action = { id: nNum, action: this.action, actionDate: this.actionDate, response: this.response, status: this.statusPending, updatedDate: undefined };
    this.enquiryActions.push(action);
    this.action = '';
    this.response = '';
  }

  removeAction(idx: number): void {
    this.enquiryActions.splice(idx, 1);
  }

  saveActions(): void {
    if (this.enquiryActions.length === 0) return;
    // if status is 'completed', already saved to db. DO not send back
    // if just checked for complete, it will be '_completing'
    const dataToSend = this.enquiryActions.filter(ea => ea.status !== this.statusCompleted)
    // before saving change UI related id (negative to zero, so it will be saved in db)
    this.enquiryActions.map(e => {
      if (e.id < 0){
        e.id = 0;
      }
    });

    this.enquiresService.saveEnquiryActions(this.referenceId, dataToSend)
    .subscribe({
      next: (data) =>{
        console.log('Enquiry actions saved');
        this._router.navigate(['/enquires', {}]);
      },
      error: (error) => {
        console.log('Error saving enquiry actions ', error);
      }
    })
  }

  onCancel(): void {
    this._router.navigate(['/enquires', {}]);
  }



    // === helper methods ==========================
  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }


}
