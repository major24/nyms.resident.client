import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BudgetListResponse, SpendRequest, createSpendRequest, Budget } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../../helpers/utils';
import * as SpendStatusType from '../../../../models/spend-status';
import  * as BudgetTypesType from '../../../../models/budget-types';

@Component({
  selector: 'user-budgets-list',
  templateUrl: './user-budgets-list.component.html',
  styleUrls: ['./user-budgets-list.component.css']
})
export class UserBudgetsListComponent implements OnInit {
  budgets: BudgetListResponse[] = []
  budgetNames: Budget[] = [];
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  selectedBudgetId: number = 0;
  selectedBudget: BudgetListResponse;
  spendRequest: SpendRequest = createSpendRequest();
  poNumber: string = '...';
  startDate: string = '';
  endDate: string = '';
  SpendStatus = SpendStatusType.SpendStatus;
  BudgetTypes = BudgetTypesType.BudgetTypes;
  referenceId: string = '';

  createAddSpendForm = new FormGroup({
    amount: new FormControl(''),
    comments: new FormControl(''),
    spendStatusSelect: new FormControl('')
  });

  budgetListForm = new FormGroup({
    projectTypes: new FormControl('')
  })

  constructor(private router: Router,
    private budgetService: BudgetService,
    private readonly util: Util,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.startDate = this.util.getFirstDayOfTheMonth();
    this.endDate = this.util.getLastDayOfTheMonth();
    this.loadBudgetNamesForUser();
  }

  loadBudgetsForUser(startDate: string, endDate: string): void {
    this.loading = true;
    this.budgets = Object.assign([], []);
    this.budgetService.loadBudgetsForUser(startDate, endDate)
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

  loadBudgetNamesForUser(): void {
    this.loading = true;
    this.budgetNames = Object.assign([], []);
    // default to string
    this.budgetService.loadBudgetNamesForUser(BudgetTypesType.BudgetTypes.Project.toString())
      .subscribe({
        next: (data) => {
          Object.assign(this.budgetNames, [...data]);
          console.log('>>budNames', this.budgetNames);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budget names', error);
          this.loading = false;
        }
      });
  }

  loadBudgetByReferenceId(refereneId: string): void {
    this.loading = true;
    this.budgets = Object.assign([], []);
    this.budgetService.loadBudgetByReferenceId(refereneId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.budgets = Object.assign(this.budgets, [data]);
          console.log('>>', this.budgets);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }

  onStartDateChange(event: any): void {
    this.startDate = event;
  }

  onEndDateChange(event: any): void {
    this.endDate = event;
  }

  getBudgetsByDate(): void {
    if (this.endDate === '' || this.startDate === '') return;
    this.loadBudgetsForUser(this.startDate, this.endDate);
    // reset referenceid, so it will not fetch on createSpend..
    this.referenceId = '';
    this.budgetListForm.controls['projectTypes'].setValue('');
  }

  onProjectTypesChange(event: any): void {
    this.referenceId = event.target.value;
    if (this.referenceId) {
      this.loadBudgetByReferenceId(this.referenceId);
    }
  }

  onAmountChange(event: any): void {
    this.spendRequest = Object.assign(this.spendRequest, { amount: +event.target.value });
  }

  onCommentsChange(event: any): void {
    let spendComments = this.spendRequest.spendComments;
    spendComments.comments = event.target.value;
    this.spendRequest = Object.assign(this.spendRequest, { spendComments: spendComments});
  }

  onSpendStatusSelectChange(event: any): void {
    let spendComments = this.spendRequest.spendComments;
    spendComments.status = event.target.value;
    this.spendRequest = Object.assign(this.spendRequest, { spendComments: spendComments});
  }

  setSpendCommentStatus(status: any): void {
    let spendComments = this.spendRequest.spendComments;
    spendComments.status = status;
    this.spendRequest = Object.assign(this.spendRequest, { spendComments: spendComments});
  }

  navToSpendList(budgetId: number): void {
    this.router.navigate(['/user/spends-list', budgetId]);
  }


  // ready to save
  createSpend(): void {
    this.error = '';
    if (this.spendRequest.amount <= 0 || this.spendRequest.spendComments.comments === '') {
      this.error = 'All fields are required.';
      return;
    }
    if (this.spendRequest.budgetId <= 0) {
      this.error = 'Budget id not found. Refresh the page and try again.';
      return;
    }
    // If budgetType == 1, then Project: status is required
    this.selectedBudget = this.budgets.find(b => b.id === this.selectedBudgetId);
    if (this.selectedBudget.budgetType === this.BudgetTypes.Project && !this.spendRequest.spendComments.status) {
      this.error = 'Project types requires spend status';
      return;
    }
    // If budgetType == 0, then Monthly: Set status to Completed.
    if (this.selectedBudget.budgetType === this.BudgetTypes.Monthly) {
      this.setSpendCommentStatus(this.SpendStatus.None);
    }

    console.log('rdy to submit', this.spendRequest);

    this.saving = true;
    this.budgetService.createSpend(this.spendRequest)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.poNumber = data.poNumber; // to display to user
          this.clearAddSpendDialog();
          this.disableAddSpendDialog();
          if (this.referenceId) {
            this.loadBudgetByReferenceId(this.referenceId);
          } else {
            this.loadBudgetsForUser(this.startDate, this.endDate);
          }
          this.saving = false;
          // reset spend request with current bud id.
          // Incase user wants to submit more items for the same bud id
          this.initSpendRequest(this.selectedBudget);
        },
        error: (error) => {
          console.log('Error saving spend', error);
          this.saving = false;
        }
      });
  }


  clearAddSpendDialog(): void {
    this.createAddSpendForm.controls['amount'].setValue('');
    this.createAddSpendForm.controls['comments'].setValue('');
    this.createAddSpendForm.controls['spendStatusSelect'].setValue('');
  }

  disableAddSpendDialog(): void {
    this.createAddSpendForm.controls['amount'].disable();
    this.createAddSpendForm.controls['comments'].disable();
    this.createAddSpendForm.controls['spendStatusSelect'].disable();
  }

  enableAddSpendDialog(): void {
    this.createAddSpendForm.controls['amount'].enable()
    this.createAddSpendForm.controls['comments'].enable();
    this.createAddSpendForm.controls['spendStatusSelect'].enable();
  }

  initSpendRequest(budget: BudgetListResponse): void {
    this.spendRequest = Object.assign({}, createSpendRequest());
    this.spendRequest = Object.assign(
      this.spendRequest, {
      budgetId: budget.id,
      poNumber: budget.poPrefix
    });
  }

  // open from template
  openModal(content: any, id: number) {
    this.enableAddSpendDialog();
    this.selectedBudgetId = +id;
    this.error = '';
    if (this.selectedBudgetId <= 0) return;
    this.poNumber = '';
    this.selectedBudget = this.budgets.find(b => b.id === this.selectedBudgetId);
    this.initSpendRequest(this.selectedBudget);

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
