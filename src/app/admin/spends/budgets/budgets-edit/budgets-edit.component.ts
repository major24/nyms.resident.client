import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpendCategory } from '../../../models/index';
import { Budget, createInstanceOfBudget, createInstanceOfBudgetAllocation } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { UserService } from '../../../../services/user.service';
import { SpendCategoryService } from '../../../services/spend-category.service';
import { CareHome0 } from '../../../../residents/models/carehome';
import { CarehomeService } from '../../../../residents/services/carehome.service';
import { KeyPair } from '../../../../models/index';

@Component({
  selector: 'budgets-edit',
  templateUrl: './budgets-edit.component.html',
  styleUrls: ['./budgets-edit.component.css']
})
export class BudgetsEditComponent implements OnInit {
  pageHeader = 'Add Budget';
  spendCategories: SpendCategory[] = [];
  careHomes: CareHome0[] = [];
  loading: boolean = false;
  errors: string[] = [];
  saving: boolean = false;
  rawBudget: Budget = createInstanceOfBudget();
  budget: Budget = this.rawBudget;
  poPrefixCareHome: string = '';
  poPrefixCateCode: string = ''
  showAddExtraBudgetAmountButton: boolean = false;

  createBudgetForm = new FormGroup({
    spendCategory: new FormControl(''),
    careHome: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    approve: new FormControl(''),
    status: new FormControl(''),
    poCode: new FormControl(''),
    reason: new FormControl('')
  });

  statuses: KeyPair[] = [
    { "key": 'Open', "value": "Open" },
    { "key": 'Completed', "value": "Completed" },
    { "key": 'Cancelled', "value": "Cancelled" }
  ];

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private spendCategoryService: SpendCategoryService,
    private careHomeService: CarehomeService,
    private budgetService: BudgetService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadCareHomes();

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        this.pageHeader = 'Edit Budget';
        this.loadBudgetAndAllocationsByReferenceId(referenceId);
      } else {
        // new budget. add an empty allocation to be populated
      }
    });
  } //ngOninit


  loadCategories(): void {
    this.loading = true;
    this.spendCategoryService.loadCategories()
      .subscribe({
        next: (data) => {
          Object.assign(this.spendCategories, [...data]);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching categories ', error);
          this.loading = false;
        }
      });
  }

  loadCareHomes(): void {
    this.loading = true;
    this.careHomeService.loadCareHomes()
      .subscribe({
        next: (data) => {
          Object.assign(this.careHomes, [...data]);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching carehomes ', error);
          this.loading = false;
        }
      });
  }

  loadBudgetAndAllocationsByReferenceId(referenceId: string): void {
    this.loading = true;
    this.budgetService.loadBudgetAndAllocationsByReferenceId(referenceId)
      .subscribe({
        next: (data) => {
          // console.log('>>budget>>', data);
          this.budget = Object.assign(this.budget, data);
          this.loading = false;
          this.setupBudgetEditForm(this.budget);
          this.setShowAddExtraBudgetAmountButton(this.budget);
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    this.errors = [];
    if (this.budget.spendCategoryId <= 0) {
      this.errors.push('Spend category is required');
    }
    if (this.budget.careHomeId <= 0) {
      this.errors.push('Carehome is required');
    }
    if (!this.budget.name) {
      this.errors.push('Name is required');
    }
    if (this.budget.dateFrom === '' || this.budget.dateTo === '') {
      this.errors.push('Budget dates are required');
    }
    this.budget.budgetAllocations.forEach(a => {
      if (a.amount <= 0) {
        this.errors.push('Amount is required');
      }
    });
    if (this.errors.length > 0) return;

    this.saving = true;
    console.log('rdy to save', this.budget);

    if (this.budget.referenceId === '') {
      this.createSpendBudget(this.budget);
    } else {
      this.updateSpendBudget(this.budget);
    }
  }

  createSpendBudget(budget: Budget): void {
    this.budgetService.createBudget(budget)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.onCancel();
        },
        error: (error) => {
          console.log('Error creating budget', error);
          this.saving = false;
        }
      });
  }

  updateSpendBudget(budget: Budget): void {
    this.budgetService.updateBudget(budget)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.onCancel();
        },
        error: (error) => {
          console.log('Error updating budget', error);
          this.saving = false;
        }
      });
  }


  onCancel(): void {
    this.router.navigate(['/admin/budgets-list', {}]);
  }

  setupBudgetEditForm(budget: Budget): void {
    this.createBudgetForm.controls['spendCategory'].setValue(this.budget.spendCategoryId);
    this.createBudgetForm.controls['careHome'].setValue(this.budget.careHomeId);
    this.createBudgetForm.controls['name'].setValue(this.budget.name);
    this.createBudgetForm.controls['description'].setValue(this.budget.description);
    this.createBudgetForm.controls['poCode'].setValue(this.budget.poPrefix);
    this.createBudgetForm.controls['status'].setValue(this.budget.status);
    // disable category and carehome
    this.createBudgetForm.controls['spendCategory'].disable();
    this.createBudgetForm.controls['careHome'].disable();
    if (budget.status === 'Completed') {
      this.createBudgetForm.controls['status'].disable();
    }
  }

  setShowAddExtraBudgetAmountButton(budget: Budget): void {
    const approvedAmounts = budget.budgetAllocations.filter(a => a.approved === 'Y');
    const isFinanceAdmin = this.userService.isInRoleFromToken('Finance Admin');
    this.showAddExtraBudgetAmountButton = approvedAmounts.length === budget.budgetAllocations.length && isFinanceAdmin;
  }



  addAdditionalAmount(): void {
    this.budget.budgetAllocations.push(createInstanceOfBudgetAllocation());
    this.showAddExtraBudgetAmountButton = false;
  }

  onSpendCategoryChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      spendCategoryId: +event.target.value,
    });
    this.poPrefixCateCode = this.spendCategories.filter(cat => cat.id === +event.target.value)[0].catCode;
    this.updatePoPrefix();
  }

  onCareHomeChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      careHomeId: +event.target.value,
    });
    this.poPrefixCareHome = this.careHomes.filter(ch => ch.id === +event.target.value)[0].chCode;
    this.updatePoPrefix();
  }

  onNameChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      name: event.target.value,
    });
  }

  onDescriptionChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      description: event.target.value,
    });
  }

  onDateFromChange(date: any): void {
    this.budget = Object.assign(this.budget, {
      dateFrom: date,
    });
  }

  onDateToChange(date: any): void {
    this.budget = Object.assign(this.budget, {
      dateTo: date,
    });
  }

  onPoCodeChange(event: any): void {
    this.poPrefixCateCode = event.target.value;
    this.updatePoPrefix();
  }

  updatePoPrefix(): void {
    this.budget = Object.assign(this.budget, {
      poPrefix: `${this.poPrefixCareHome}-${this.poPrefixCateCode}`,
    });
  }

  onStatusChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      status: event.target.value,
    });
  }

  onAmountChange(event: any, idx: number): void {
    for (let i = 0; i < this.budget.budgetAllocations.length; i++) {
      if (this.budget.budgetAllocations[i].id === idx) {
        this.budget.budgetAllocations[i].amount = +event.target.value;
      }
    }
  }

  onApproveChange(event: any, idx: number): void {
    const aprd = (event.target.checked ? 'Y' : 'N');
    for (let i = 0; i < this.budget.budgetAllocations.length; i++) {
      if (this.budget.budgetAllocations[i].id === idx) {
        this.budget.budgetAllocations[i].approved = aprd;
      }
    }
  }

  onReasonChange(event: any, idx: number): void {
    for (let i = 0; i < this.budget.budgetAllocations.length; i++) {
      if (this.budget.budgetAllocations[i].id === idx) {
        this.budget.budgetAllocations[i].reason = event.target.value;
      }
    }
  }


}
