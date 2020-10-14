import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident, SchedulePayment, InvoiceData, InvoiceValidatedModel, InvoiceValidatedRequest, InvoiceCommentsRequest } from '../../../models/index';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../services/index';

@Component({
  selector: 'report-list-with-validation',
  templateUrl: './report-list-with-validation.component.html',
  styleUrls: ['./report-list-with-validation.component.css']
})
export class ReportListWithValidationComponent implements OnInit {
  // @Input() invoices: InvoiceResident[] = [];
  invoices: InvoiceResident[] = [];
  @Input() invoiceData: InvoiceData;

  closeResult = '';
  selectedScheduleId: number = 0;
  transactionAmount: number = 0;
  comments: string = '';
  saving: boolean = false;
  selectedSchedulePayment: SchedulePayment;
  displayComments: string[] = [];

  reportListWithValidationForm = new FormGroup({
    isValid: new FormControl(null),
    transactionAmount: new FormControl(''),
    comments: new FormControl('')
  });

  constructor(private modalService: NgbModal, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceData = { id:0, beginDate:'', endDate:'', billingCycleId:0, billingDate:'', numberOfDays:0, invoiceResidents: this.invoices }
  }


  // save to database
  save(): void {
    // ONLY send validated 'Y' data
    const billingCycleId = this.invoiceData.billingCycleId;
    let list: InvoiceValidatedRequest[] = [];
    this.invoiceData.invoiceResidents.map(ir => ir.schedulePayments.map(sp => {
      if(sp.invoiceValidatedModel.validated === 'Y' && sp.invoiceValidatedModel.id === 0) {
        list.push( {
          id: 0,
          localAuthorityId: sp.localAuthorityId,
          billingCycleId: billingCycleId,
          residentId: sp.residentId,
          paymentTypeId: sp.paymentTypeId,
          amountDue: sp.amountDue,
          validated: sp.invoiceValidatedModel.validated
        });
      }
    }));

    if (list.length > 0){
      this.invoiceService.updateInvoicePaymentsWithValidation(list)
      .subscribe({
        next: (data) => {
          console.log('invoices with validation are updated');
        },
        error: (error) => { console.log('Error updating validated invoices', error); }
      });
    }
  }


    // save to database
    saveComments(): void {
      if (this.comments === "") return;
      if (!this.selectedSchedulePayment) return;

      const billingCycleId = this.invoiceData.billingCycleId;
      const invoiceCommentsRequest: InvoiceCommentsRequest = {
        id: 0,
        localAuthorityId: this.selectedSchedulePayment.localAuthorityId,
        billingCycleId: billingCycleId,
        residentId: this.selectedSchedulePayment.residentId,
        paymentTypeId: this.selectedSchedulePayment.paymentTypeId,
        comments: this.comments,
        transactionAmount: 0,
        updatedById: 0,
        updatedDate: ''
      }
      console.log('rdy==', invoiceCommentsRequest)
      this.invoiceService.insertInvoiceComment(invoiceCommentsRequest)
      .subscribe({
        next: (data) => {
          console.log('invoice comment inserted');
        },
        error: (error) => { console.log('Error updating validated invoices', error); }
      });

    }


  onIsValidChange(event: any, scheduleId: number): void {
      const billingCycleId = this.invoiceData.billingCycleId;
      this.invoiceData.invoiceResidents.map(ir => ir.schedulePayments.map(sp => {
        if (sp.id === scheduleId) {
          let invoiceValidatedModel: InvoiceValidatedModel = {
            id: 0,
            billingCycleId: billingCycleId,
            paymentTypeId: sp.paymentTypeId,
            amountDue: sp.amountDue,
            validated: event.target.checked ? 'Y' : null,
            validatedAmount: 0,
            updatedDate: '',
            updatedBy: '' };
            Object.assign(sp.invoiceValidatedModel, invoiceValidatedModel);
        }
      }));
  }

//x = Object.assign(x, { validated: event.target.checked ? 'Y' : '' });
  onActualPaymentChange(event: any): void {
    this.transactionAmount = +event.target.value;
  }

  onCommentsChange(event: any): void {
    this.comments = event.target.value;
  }

  updateDataSet(): void {
    let x: SchedulePayment;
    this.invoices.map(i => i.schedulePayments.map(s => {
      if (s.id === this.selectedScheduleId) x = s;
    }));
    x = Object.assign(x, { transactionAmount: this.transactionAmount, comments: this.comments });
    this.modalService.dismissAll();
  }

  // modal
  openModal(content: any, id: number, schedulePayment: SchedulePayment) {
    this.selectedScheduleId = +id;
    this.selectedSchedulePayment = schedulePayment;
    this.open(content);
  }
  // private
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result) => {
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


  openModalComments(content: any, comments: string[]) {
    this.open(content);
    this.displayComments = [];
    Object.assign(this.displayComments, [...comments]);
  }



}
