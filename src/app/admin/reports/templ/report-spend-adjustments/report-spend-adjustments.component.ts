import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BudgetListResponse, SpendRequest, createSpendRequest, TransferSpendRequest, SpendComments, createSpendComments } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'report-spend-adjustments',
  templateUrl: './report-spend-adjustments.component.html',
  styleUrls: ['./report-spend-adjustments.component.css']
})
export class ReportSpendAdjustmentsComponent implements OnInit {
  @Input() startDate: any;
  @Input() endDate: any;
  budgets: BudgetListResponse[] = []
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  selectedBudgetId: number = 0;
  selectedBudget: BudgetListResponse;
  spendRequest: SpendRequest = createSpendRequest();
  spendComments: SpendComments = createSpendComments();
  originalAmount: number = 0;
  originalPoNumber: string = '';
  transferSpendRequest: TransferSpendRequest = {
    transferFromSpendId: 0,
    transferToBudgetReferenceId: '',
    comments: ''
  };

  issueCreditNoteForm = new FormGroup({
    amount: new FormControl(''),
    comments: new FormControl('')
  });

  transferSpendForm = new FormGroup({
    comments: new FormControl(''),
    transferFrom: new FormControl('')
  });

  constructor(private router: Router,
    private budgetService: BudgetService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getReport(): void {
    this.loadBudgetsForSummryReport(this.startDate, this.endDate);
    this.resetTransferObject();
  }

  loadBudgetsForSummryReport(startDate: string, endDate: string): void {
    this.loading = true;
    this.budgets = Object.assign([], []);
    this.budgetService.loadBudgetsForSummryReport(startDate, endDate)
      .subscribe({
        next: (data) => {
          Object.assign(this.budgets, [...data]);
          console.log('>>>', this.budgets)
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }


  // =======================================================================================
  // Issue credit note
  onAmountChange(event: any): void {
    let amt = +event.target.value;
    if (amt > 0) {
      amt = amt * -1;
    }
    this.spendRequest = Object.assign(this.spendRequest, { amount: amt });
  }

  onCommentsChange(event: any): void {
    this.spendComments = Object.assign(this.spendComments, { comments:  event.target.value });
    this.spendRequest = Object.assign(this.spendRequest, { spendComments: this.spendComments });
  }

  issueCreditNote(): void {
    if (!this.spendRequest.amount || this.spendRequest.spendComments.comments == '') {
      this.error = 'Amount and notes are required';
      return;
    }
    console.log('rdy to save', this.spendRequest);
    this.saving = true;
    this.budgetService.issueCreditNote(this.spendRequest)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.modalService.dismissAll();
          this.loadBudgetsForSummryReport(this.startDate, this.endDate);
        },
        error: (error) => {
          console.log('Error saving spend', error);
          this.saving = false;
        }
      });
  }

    // open from CR template
    openModalForCreditNote(content: any, budgetId: number, spendId: number) {
      this.error = '';
      this.originalAmount = 0;
      const bgt = this.budgets.find(b => b.id === budgetId);
      const spnd = bgt.spends.find(sp => sp.id === spendId);
      this.originalAmount = spnd.amount;
      this.originalPoNumber = spnd.poNumber;

      this.issueCreditNoteForm.controls['amount'].setValue('');
      this.issueCreditNoteForm.controls['comments'].setValue('');

      this.spendRequest = Object.assign(this.spendRequest, {
        tranType: 'Credit',
        budgetId: budgetId,
        poNumber: spnd.poNumber
      });

      this.open(content);
    }
  //==============================================================================



  //=============================================================================
  // Transfer amount from one spend to another
  onTransferSpendFromChange(event: any, spendId: number): void {
    this.transferSpendRequest = Object.assign(this.transferSpendRequest, {
      transferFromSpendId: spendId,
      transferToBudgetReferenceId: ''
     });
  }

  onTransferCommentsChange(event: any): void {
    this.transferSpendRequest = Object.assign(this.transferSpendRequest, { comments:  event.target.value });
  }

  transferSpend(): void {
    if (!this.transferSpendRequest.transferToBudgetReferenceId || this.transferSpendRequest.transferToBudgetReferenceId === '') {
      this.error = 'Transfer To reference id is required. Please select the radio button for the budget.';
      return;
    }
    if (this.transferSpendRequest.comments == '') {
      this.error = 'Comments is required';
      return;
    }
    console.log('rdy to save', this.transferSpendRequest);
    this.saving = true;
    this.budgetService.transferSpend(this.transferSpendRequest)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.modalService.dismissAll();
          this.loadBudgetsForSummryReport(this.startDate, this.endDate);
        },
        error: (error) => {
          console.log('Error transfering spend', error);
          this.error = error;
          this.saving = false;
        }
      });
  }

  resetTransferObject(): void {
    this.transferSpendRequest = Object.assign(this.transferSpendRequest, {
      transferFromSpendId: 0,
      transferToBudgetReferenceId: '',
      comments: ''
    });
  }

  // open from template
  openModalForTransfer(content: any, budgetId: number) {
    this.error = '';
    if (this.transferSpendRequest.transferFromSpendId <= 0) {
      return; // dialog will not open. no error msg as well. todo
    }
    const bgt = this.budgets.find(b => b.id === budgetId);
    const found = bgt.spends.find(sp => sp.id === this.transferSpendRequest.transferFromSpendId);
    if (found) { // transfering within same id
      return;
    }
    this.transferSpendForm.controls['comments'].setValue('');

    this.transferSpendRequest = Object.assign(this.transferSpendRequest, {
      transferToBudgetReferenceId: bgt.referenceId,
      comments: ''
    });

    this.open(content);
  }
  //==============================================================================



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




}
