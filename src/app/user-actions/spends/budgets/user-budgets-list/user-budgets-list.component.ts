import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpendBudgetListResponse, SpendRequest, createSpendRequest } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'user-budgets-list',
  templateUrl: './user-budgets-list.component.html',
  styleUrls: ['./user-budgets-list.component.css']
})
export class UserBudgetsListComponent implements OnInit {
  spendBudgets: SpendBudgetListResponse[] = []
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  selectedId: number = 0;
  selectedSpendBudget: SpendBudgetListResponse;
  spendRequest: SpendRequest = createSpendRequest();
  poNumber: string = '...';

  createAddSpendForm = new FormGroup({
    amount: new FormControl(''),
    vat: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(private router: Router,
    private budgetService: BudgetService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadBudgetsForUser();
  }

  loadBudgetsForUser(): void {
    this.loading = true;
    this.budgetService.loadBudgetsForUser()
    .subscribe({
      next: (data) => {
        Object.assign(this.spendBudgets, [...data]);
        console.log(this.spendBudgets);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching budgets', error);
        this.loading = false;
      }
    });
  }


  createSpend(): void {
    this.error = '';
    if (this.spendRequest.amount <= 0 || this.spendRequest.notes === '') {
      this.error = 'All fields are required.';
      return;
    }

    console.log('rdy to submit', this.spendRequest);

    this.saving = true;
    this.budgetService.createSpend(this.spendRequest)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.poNumber = data.poNumber;
        this.clearAddSpendDialog();
        this.loadBudgetsForUser();
        this.saving = false;
      },
      error: (error) => {
        console.log('Error saving spend', error);
        this.saving = false;
      }
    });
  }

  clearAddSpendDialog(): void {
    this.createAddSpendForm.controls['amount'].setValue('');
    this.createAddSpendForm.controls['vat'].setValue('');
    this.createAddSpendForm.controls['notes'].setValue('');
  }

  onAmountChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { amount: +event.target.value });
  }

  onVatChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { vat: +event.target.value });
  }

  onNotesChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { notes: event.target.value });
  }

  navToSpendList(budgetId: number): void {
    this.router.navigate(['/user/spends-list', budgetId]);
  }


  // open from template
  openModal(content: any, id: number) {
    this.selectedId = +id;
    this.error = '';
    if (this.selectedId <= 0) return;

    this.selectedSpendBudget = this.spendBudgets.find(b => b.id === this.selectedId);
    this.spendRequest = Object.assign(
      this.spendRequest, {
        spendBudgetId: this.selectedSpendBudget.id,
        poNumber: this.selectedSpendBudget.poPrefix
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
