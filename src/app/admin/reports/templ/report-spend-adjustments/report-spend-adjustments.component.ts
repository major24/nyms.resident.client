import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BudgetListResponse, SpendRequest, createSpendRequest, TransferSpendRequest } from '../../../../models/spend-budgets';
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
  originalAmount: number = 0;
  originalPoNumber: string = '';
  transferSpendRequest: TransferSpendRequest = {
    transferFromSpendId: 0,
    transferToBudgetReferenceId: '',
    notes: ''
  };

  issueCreditNoteForm = new FormGroup({
    amount: new FormControl(''),
    notes: new FormControl('')
  });

  transferSpendForm = new FormGroup({
    notes: new FormControl(''),
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
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }


  // Issue credit note
  onAmountChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { amount: +event.target.value });
  }

  onNotesChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { notes: event.target.value });
    this.transferSpendRequest = Object.assign(this.transferSpendRequest, { notes: event.target.value });
  }

  onTransferSpendFromChange(event: any, spendId: number): void {
    this.transferSpendRequest = Object.assign(this.transferSpendRequest, {
      transferFromSpendId: spendId,
      transferToBudgetReferenceId: ''
     });
  }

  issueCreditNote(): void {
    if (!this.spendRequest.amount || this.spendRequest.notes == '') {
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

  transferSpend(): void {
    if (!this.transferSpendRequest.transferToBudgetReferenceId || this.transferSpendRequest.transferToBudgetReferenceId === '') {
      this.error = 'Transfer To reference id is required. Please select the radio button for the budget.';
      return;
    }
    if (this.transferSpendRequest.notes == '') {
      this.error = 'Notes is required';
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
      notes: ''
    });
  }


  // open from template
  openModalForTransfer(content: any, budgetId: number) {
    this.error = '';
    if (this.transferSpendRequest.transferFromSpendId <= 0) {
      return; // dialog will not open. no error msg as well. todo
    }
    const bgt = this.budgets.find(b => b.id === budgetId);
    const found = bgt.spendResponses.find(sp => sp.id === this.transferSpendRequest.transferFromSpendId);
    if (found) { // transfering within same id
      return;
    }
    this.transferSpendForm.controls['notes'].setValue('');

    this.transferSpendRequest = Object.assign(this.transferSpendRequest, {
      transferToBudgetReferenceId: bgt.referenceId,
      notes: ''
    });

    this.open(content);
  }



  // open from template
  openModal(content: any, budgetId: number, spendId: number) {
    this.error = '';
    this.originalAmount = 0;
    const bgt = this.budgets.find(b => b.id === budgetId);
    const spnd = bgt.spendResponses.find(sp => sp.id === spendId);
    this.originalAmount = spnd.amount;
    this.originalPoNumber = spnd.poNumber;

    this.spendRequest = Object.assign(this.spendRequest, {
      tranType: 'Credit',
      budgetId: budgetId,
      poNumber: spnd.poNumber
    });

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




}
