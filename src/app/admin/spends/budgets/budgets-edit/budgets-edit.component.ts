import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpendBudget, SpendCategory, createInstanceOfSpendBudget, SpendBudgetAllocation } from '../../../models/index';
import { BudgetService } from '../../../../services/budget.service';
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
  rawSpendBudget: SpendBudget = createInstanceOfSpendBudget();
  spendBudget: SpendBudget = this.rawSpendBudget;

  poPrefixCareHome: string = '';
  poPrefixCateCode: string = ''

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
    poCode: new FormControl('')
  });

  statuses: KeyPair[] = [
    { "key": 'Open', "value": "Open" },
    { "key": 'Completed', "value": "Completed" },
    { "key": 'Cancelled', "value": "Cancelled" },
    { "key": 'Paused', "value": "Paused" }
  ];

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private spendCategoryService: SpendCategoryService,
    private careHomeService: CarehomeService,
    private budgetService: BudgetService
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
        console.log('>>>bedit-add bud');
      }
    });
  } //ngOninit


  loadCategories(): void {
    this.loading = true;
    this.spendCategoryService.loadCategories()
      .subscribe({
        next: (data) => {
          Object.assign(this.spendCategories, [...data]);
          console.log('loaded cats:', this.spendCategories)
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
          console.log('loaded carehomes:', this.careHomes)
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
          console.log('>>budget>>', data);
          this.spendBudget = Object.assign(this.spendBudget, data);
          this.loading = false;
          this.setupBudgetEditForm(this.spendBudget);
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    this.errors = [];
    if (this.spendBudget.spendCategoryId <= 0) {
      this.errors.push('Spend category is required');
    }
    if (this.spendBudget.careHomeId <= 0) {
      this.errors.push('Carehome is required');
    }
    if (!this.spendBudget.name) {
      this.errors.push('Name is required');
    }
    if (this.spendBudget.dateFrom === '' || this.spendBudget.dateTo === '') {
      this.errors.push('Budget dates are required');
    }
    this.spendBudget.spendBudgetAllocations.forEach(a => {
      if (a.amount <= 0) {
        this.errors.push('Amount is required');
      }
    });
    if (this.errors.length > 0) return;

    this.saving = true;
    console.log('rdy to save', this.spendBudget);

    if (this.spendBudget.referenceId === '') {
      this.createSpendBudget(this.spendBudget);
    } else {
      this.updateSpendBudget(this.spendBudget);
    }
  }

  createSpendBudget(spendBudget: SpendBudget): void {
    this.budgetService.createBudget(this.spendBudget)
      .subscribe({
        next: (data) => {
          console.log('>>budget created>>', data);
          this.saving = false;
          this.onCancel();
        },
        error: (error) => {
          console.log('Error creating budget', error);
          this.saving = false;
        }
      });
  }

  updateSpendBudget(spendBudget: SpendBudget): void {
    this.budgetService.updateBudget(this.spendBudget)
      .subscribe({
        next: (data) => {
          console.log('>>budget updated>>', data);
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

  setupBudgetEditForm(spendBudget: SpendBudget): void {
    this.createBudgetForm.controls['spendCategory'].setValue(this.spendBudget.spendCategoryId);
    this.createBudgetForm.controls['careHome'].setValue(this.spendBudget.careHomeId);
    this.createBudgetForm.controls['name'].setValue(this.spendBudget.name);
    this.createBudgetForm.controls['description'].setValue(this.spendBudget.description);
    this.createBudgetForm.controls['poCode'].setValue(this.spendBudget.poPrefix);
    this.createBudgetForm.controls['status'].setValue(this.spendBudget.status);
  }

  onSpendCategoryChange(event: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      spendCategoryId: +event.target.value,
    });
  }

  onCareHomeChange(event: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      careHomeId: +event.target.value,
    });
    this.poPrefixCareHome = this.careHomes.filter(ch => ch.id === +event.target.value)[0].chCode;
    this.updatePoPrefix();
  }

  onNameChange(event: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      name: event.target.value,
    });
  }

  onDescriptionChange(event: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      description: event.target.value,
    });
  }

  onDateFromChange(date: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      dateFrom: date,
    });
  }

  onDateToChange(date: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      dateTo: date,
    });
  }

  onPoCodeChange(event: any): void {
    this.poPrefixCateCode = event.target.value;
    this.updatePoPrefix();
  }

  updatePoPrefix(): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      poPrefix: `${this.poPrefixCareHome}-${this.poPrefixCateCode}`,
    });
  }

  onStatusChange(event: any): void {
    this.spendBudget = Object.assign(this.spendBudget, {
      status: event.target.value,
    });
  }

  onAmountChange(event: any, idx: number): void {
    for (let i = 0; i < this.spendBudget.spendBudgetAllocations.length; i++) {
      if (this.spendBudget.spendBudgetAllocations[i].id === idx) {
        this.spendBudget.spendBudgetAllocations[i].amount = +event.target.value;
      }
    }
  }

  onApproveChange(event: any, idx: number): void {
    const aprd = (event.target.checked ? 'Y' : 'N');
    for (let i = 0; i < this.spendBudget.spendBudgetAllocations.length; i++) {
      if (this.spendBudget.spendBudgetAllocations[i].id === idx) {
        this.spendBudget.spendBudgetAllocations[i].approved = aprd;
      }
    }
  }


}
