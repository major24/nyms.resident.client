import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SpendCategory } from '../../../models/index';
import { Budget, createInstanceOfBudget, createInstanceOfBudgetAllocation } from '../../../../models/spend-budgets';
import  * as BudgetTypesType from '../../../../models/budget-types';
import { BudgetService } from '../../../../services/budget.service';
import { UserService } from '../../../../services/user.service';
import { SpendCategoryService } from '../../../services/spend-category.service';
import { CareHome0 } from '../../../../residents/models/carehome';
import { CarehomeService } from '../../../../residents/services/carehome.service';
import { KeyPair } from '../../../../models/index';
// import { EnumKeyValuePipe } from '../../../../../app/enum-keyvalue.pipe';

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
  errorsDialog: string[] = [];
  saving: boolean = false;
  referenceId: string = '';
  rawBudget: Budget = createInstanceOfBudget();
  budget: Budget = this.rawBudget;
  newBudgetAmount: Budget = createInstanceOfBudget();
  poPrefixCareHome: string = '';
  poPrefixCateCode: string = '';
  isAddingNewBudget: boolean = false;
  showAddExtraBudgetAmountButton: boolean = false;
  isBudgetEditable: boolean = true;
  closeResult = '';
  BudgetTypes = BudgetTypesType.BudgetTypes;


  createBudgetForm = new FormGroup({
    spendCategory: new FormControl(''),
    careHome: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    budgetType: new FormControl(''),
    budgetMonth: new FormControl(''),
    amount: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    approve: new FormControl(''),
    status: new FormControl(''),
    poCode: new FormControl(''),
    reason: new FormControl(''),
    numberOfMonths: new FormControl('')
  });

  createIncreaseAmountForm = new FormGroup({
    newAmount: new FormControl(''),
    newApprove: new FormControl(''),
    newReason: new FormControl('')
  });

  statuses: KeyPair[] = [
    { "key": 'Open', "value": "Open" },
    { "key": 'Completed', "value": "Completed" },
    { "key": 'Cancelled', "value": "Cancelled" }
  ];

  months: KeyPair[] = [
    { "key": 1, "value": "January" },
    { "key": 2, "value": "February" },
    { "key": 3, "value": "March" },
    { "key": 4, "value": "April" },
    { "key": 5, "value": "May" },
    { "key": 6, "value": "June" },
    { "key": 7, "value": "July" },
    { "key": 8, "value": "August" },
    { "key": 9, "value": "September" },
    { "key": 10, "value": "October" },
    { "key": 11, "value": "November" },
    { "key": 12, "value": "December" }
  ];


  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private spendCategoryService: SpendCategoryService,
    private careHomeService: CarehomeService,
    private budgetService: BudgetService,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadCareHomes();

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        this.pageHeader = 'Edit Budget';
        this.loadBudgetByReferenceId(this.referenceId);
        this.isAddingNewBudget = false;
      } else {
        this.isAddingNewBudget = true;
      }
    });

    console.log('>>>', this.BudgetTypes)
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

  loadBudgetByReferenceId(referenceId: string): void {
    this.loading = true;
    this.budgetService.loadBudgetByReferenceId(referenceId)
      .subscribe({
        next: (data) => {
          this.budget = Object.assign(this.budget, data);
          this.loading = false;
          console.log('>>>', this.budget);
          // Conv req for budgetTyps. returns 0 or 1 for Monthy and project. need to convert to angular enum
          // if (this.budget.budgexxtType === xxBudgTypes.Project) {
          //   this.budget.budgexxtType = BudgetxxxTypes.Project
          // }
          // console.log('>>>1', this.budget);
          this.setupBudgetEditForm(this.budget);
          this.setShowAddExtraBudgetAmountButton(this.budget);
          this.setIsBudgetEditable(this.budget);
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
    this.budget.budgetAllocations.forEach(a => {
      if (a.amount <= 0) {
        this.errors.push('Amount is required');
      }
    });
    if (this.budget.budgetType === this.BudgetTypes.Monthly && this.budget.budgetMonth ===  0) {
      this.errors.push('If budget type is Monthly, budget month is required.');
    }
    if (this.budget.budgetType === this.BudgetTypes.Project && (this.budget.dateFrom ===  '' || this.budget.dateTo ===  '')) {
      this.errors.push('If budget type is Project, budget start and to dates are required.');
    }
    if (this.errors.length > 0) return;

    this.saving = true;
    console.log('rdy to save', this.budget);

    if (this.budget.referenceId === '') {
      this.createBudget(this.budget);
    } else {
      this.updateBudget(this.budget);
    }
  }

  createBudget(budget: Budget): void {
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

  updateBudget(budget: Budget): void {
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
    document.getElementById("reasonReadonly").innerHTML = this.budget.reason;
    // disable category and carehome
    this.createBudgetForm.controls['spendCategory'].disable();
    this.createBudgetForm.controls['careHome'].disable();
    if (budget.status === 'Completed') {
      this.createBudgetForm.controls['status'].disable();
    }
    // budgetMonth is NOT returned by query. Date is saved into dateFrom and dateTo values for Monthly and Project types
    // parse month from dateFrom and set budgetMonth control
    console.log('I am here0', this.budget.budgetType);
    if (this.budget.budgetType === this.BudgetTypes.Monthly) {
      console.log('I am here1', this.budget.budgetType);
      this.createBudgetForm.controls['budgetType'].setValue(this.BudgetTypes.Monthly);
      this.budget = Object.assign(this.budget, {
        budgetMonth: new Date(this.budget.dateFrom).getMonth()+1
      });
      this.createBudgetForm.controls['budgetMonth'].setValue(this.budget.budgetMonth);
    } else if (this.budget.budgetType == this.BudgetTypes.Project) {
      console.log('I am here2', this.budget.budgetType);
      this.createBudgetForm.controls['budgetType'].setValue(this.BudgetTypes.Project);
    }
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

  onReasonChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      reason: event.target.value,
    });
  }

  onBudgetTypeChange(event: any): void {
    console.log('>>UUU', event.target.value);
    // this._budgetType = event.target.value;
    this.budget = Object.assign(this.budget, {
      budgetType: +event.target.value,
    });

    if (this.budget.budgetType === this.BudgetTypes.Project) {
      // Reset budget month and numOfMonth (recurrsion)
      this.budget = Object.assign(this.budget, {
        budgetMonth: 0,
        numberOfMonths: 0
      });
      this.createBudgetForm.controls['budgetMonth'].setValue('');
      this.createBudgetForm.controls['numberOfMonths'].setValue('');
    } else {
      // Monthly. reset dateFrom and dateTo
      this.budget = Object.assign(this.budget, {
        dateFrom: '',
        dateTo: ''
      });
      this.createBudgetForm.controls['budgetMonth'].setValue(this.budget.budgetMonth);
    }
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

  onBudgetMonthChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      budgetMonth: +event.target.value,
    });
  }

  onNumberOfMonthsChange(event: any): void {
    this.budget = Object.assign(this.budget, {
      numberOfMonths: +event.target.value,
    });
  }



  // Increse budget amount
  setShowAddExtraBudgetAmountButton(budget: Budget): void {
    const approvedAmounts = budget.budgetAllocations.filter(a => a.approved === 'Y');
    // const isFinanceAdmin = this.userService.isInRoleFromToken('Finance Admin'); // give all admin for now
    this.showAddExtraBudgetAmountButton = approvedAmounts.length === budget.budgetAllocations.length; // && isFinanceAdmin;
  }

  setIsBudgetEditable(budget: Budget): void {
    if (budget.status === 'Completed') {
      this.isBudgetEditable = false;
    }
  }

  onNewAmountChange(event: any): void {
    // No array. Only one item in the array to be sent
    this.newBudgetAmount.budgetAllocations[0].amount = +event.target.value;
  }

  onNewApproveChange(event: any): void {
    const aprd = (event.target.checked ? 'Y' : 'N');
    this.newBudgetAmount.budgetAllocations[0].approved = aprd;
  }

  onNewReasonChange(event: any): void {
    this.newBudgetAmount = Object.assign(this.newBudgetAmount, {
      reason: event.target.value,
    });
  }

  saveNewAmount(event: any): void {
    this.errorsDialog = [];
    if (this.newBudgetAmount.budgetAllocations[0].amount <= 0) {
      this.errorsDialog.push('Amount is required');
    }
    if (!this.newBudgetAmount.reason) {
      this.errorsDialog.push('Reason is required');
    }
    if (this.errorsDialog.length > 0) return;

    this.budgetService.saveNewAmount(this.newBudgetAmount)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.loadBudgetByReferenceId(this.referenceId);
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.log('Error adding new budget amount', error);
          this.saving = false;
        }
      });
  }


  clearAddSpendDialog(): void {
    this.createIncreaseAmountForm.controls['newAmount'].setValue('');
    this.createIncreaseAmountForm.controls['newReason'].setValue('');
  }





  // open from template
  openModal(content: any, budgetId: number, refId: string) {
    if (!budgetId || budgetId <= 0) return;
    this.errorsDialog = [];
    this.clearAddSpendDialog();
    // init new budget obj
    this.newBudgetAmount = Object.assign({}, createInstanceOfBudget());
    // set ref id
    this.newBudgetAmount = Object.assign(this.newBudgetAmount, {
      id: budgetId,
      referenceId: refId,
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
