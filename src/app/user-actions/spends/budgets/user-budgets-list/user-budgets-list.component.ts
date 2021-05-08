import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BudgetListResponse, SpendRequest, createSpendRequest } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'user-budgets-list',
  templateUrl: './user-budgets-list.component.html',
  styleUrls: ['./user-budgets-list.component.css']
})
export class UserBudgetsListComponent implements OnInit {
  budgets: BudgetListResponse[] = []
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  selectedId: number = 0;
  selectedBudget: BudgetListResponse;
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
          Object.assign(this.budgets, [...data]);
          console.log(this.budgets);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
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


  // ready to save
  createSpend(): void {
    this.error = '';
    if (this.spendRequest.amount <= 0 || this.spendRequest.notes === '') {
      this.error = 'All fields are required.';
      return;
    }
    if (this.spendRequest.budgetId <= 0) {
      this.error = 'Budget id not found. Refresh the page and try again.';
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
          // reset spend request with current bud id.
          // Incase user wants to submit more items for the same bud id
          this.initSpendRequest(this.selectedId);
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

  initSpendRequest(budgetId: number): void {
    this.spendRequest = Object.assign({}, createSpendRequest());
    this.selectedBudget = this.budgets.find(b => b.id === budgetId);
    this.spendRequest = Object.assign(
      this.spendRequest, {
      budgetId: this.selectedBudget.id,
      poNumber: this.selectedBudget.poPrefix
    });
  }

  // open from template
  openModal(content: any, id: number) {
    this.selectedId = +id;
    this.error = '';
    if (this.selectedId <= 0) return;
    // reset before editing
    this.clearAddSpendDialog();
    this.initSpendRequest(this.selectedId);

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
