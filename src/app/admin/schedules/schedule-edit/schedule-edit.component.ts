import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentSchedule, Schedule } from '../../models/index';
import { ScheduleService } from '../../services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { KeyPair } from '../../../models/index';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  residentSchedules: ResidentSchedule = { referenceId:'', localAuthorityId:0, paymentFromName:'', foreName:'', surName:'', schedules:[]};
  newSchedule: Schedule = { residentId:0, localAuthorityId:0, paymentType:'', paymentFrom:'', paymentFromName:'', description:'', scheduleBeginDate:'', scheduleEndDate:'', weeklyFee:0, amountDue:0 };

  closeResult = '';
  selectedScheduleId: number = 0;
  scheduleEndDate: string = '';
  referenceId: string = '';
  error: string = '';
  loading: boolean = false;
  saving: boolean = false;

  paymentFromList: KeyPair[] = [
    { key: 'LA', value: 'Local Authority' },
    { key: 'CC', value: 'Client Contribution' },
    { key: 'PV', value: 'Private' }
  ];
  paymentTypeList: KeyPair[] = [
    { key: 'WEEKLY', value: 'Weekly Fee' },
    { key: 'SUPPLEMENT', value: 'Supplement' },
    { key: 'ADJUSTMENT', value: 'Adjustment' }
  ];
  paymentDescriptionList: KeyPair[] = [
    { key: 'WEEKLY', value: 'Weekly Fee' },
    { key: 'SUPPLEMENT', value: 'Supplement' },
    { key: 'ADJUSTMENT', value: 'Adjustment' }
  ];

  createScheduleForm = new FormGroup({
    dpScheduleEndDate_2: new FormControl({year:9999, month:12, day:31})
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private scheduleService: ScheduleService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        // let referenceId: string = params.get('referenceId');
        this.referenceId = params.get('referenceId');
        console.log('>>>', this.referenceId);
          this.loadSchedules(this.referenceId);
      }
    });
  }

  loadSchedules(referenceId: string): void {
    if (!referenceId) return;
    this.loading = true;
    this.scheduleService.loadSchedulesByReferenceId(referenceId)
    .subscribe({
      next: (data) => {
        Object.assign(this.residentSchedules, data);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching schedules ', error);
        this.error = error;
        this.loading = false;
      }
    });
  }


  // add new schedule related
  onPaymentFromChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { paymentFrom: event.target.value });
  }
  onPaymentTypeChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { paymentType: event.target.value });
  }
  onDescriptionChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { description: event.target.value });
  }
  onScheduleBeginDateChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { scheduleBeginDate: this.convertToJsDate(event) });
  }
  onScheduleEndDateChange_2(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: this.convertToJsDate(event) });
  }
  onWeeklyFeeChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { weeklyFee: +event.target.value });
  }
  createNewSchdule(): void {
    if (!this.referenceId) {
      this.error = 'Error: Reference Id not found';
      return;
    }
    if (this.newSchedule.scheduleBeginDate === '' || this.newSchedule.paymentFrom === '' || this.newSchedule.paymentType === '') {
      this.error = 'Missing required fields';
      return;
    }
    if (this.newSchedule.scheduleEndDate === '') {
      this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: new Date('9999-12-31') });
    }

    this.saving = true;
    this.scheduleService.createSchedule(this.referenceId, this.newSchedule)
    .subscribe({
      next: (data) => {
        this.modalService.dismissAll();
        this.saving = false;
        // reload data
        this.loadSchedules(this.referenceId);
      },
      error: (error) => {
        console.log('Error saving new schedule end date in schedules ', error);
        this.saving = false;
      }
    });
  }




  // update exit date related
  onScheduleEndDateChange_1(event: any): void {
    if (event) {
      this.scheduleEndDate = `${event.year}-${event.month}-${event.day}`;
    }
  }
  updateScheduleEndDate(): void {
    this.saving = true;
    this.scheduleService.updateScheduleEndDate(this.selectedScheduleId, this.scheduleEndDate)
    .subscribe({
      next: (data) => {
        this.modalService.dismissAll();
        this.saving = false;
        // reload data
        this.loadSchedules(this.referenceId);
      },
      error: (error) => {
        console.log('Error saving schedule end date in schedules ', error);
        this.saving = false;
      }
    });
  }

  // open from template
  openModal(content: any, id: number) {
    this.selectedScheduleId = +id;
    this.open(content);
  }
  // private
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }


}
