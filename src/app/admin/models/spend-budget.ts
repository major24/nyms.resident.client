export interface SpendBudgetAllocation {
  id: number;
  spendBudgetId: number;
  amount: number;
  approved: string;
  approvedDate: string;
  approvedBy: string;
}

export interface SpendBudget {
  id: number;
  referenceId: string;
  spendCategoryId: number;
  careHomeId: number;
  name: string,
  dateFrom: string;
  dateTo: string;
  description: string;
  poPrefix: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  spendBudgetAllocations: SpendBudgetAllocation[];
}

export interface SpendBudgetListResponse {
  id: number;
  referenceId: string;
  name: string,
  dateFrom: string;
  dateTo: string;
  description: string;
  poPrefix: string;
  status: string;
  budgetTotal: number;
  spendTotal: number;
  careHomeName: string;
  spendCategoryName: string;
}

export function createInstanceOfSpendBudgetAllocation() {
  let model: SpendBudgetAllocation = {
    id: 0,
    spendBudgetId: 0,
    amount: undefined,
    approved: '',
    approvedDate: '',
    approvedBy: ''
  }
  return model;
}

export function createInstanceOfSpendBudget() {
  let model: SpendBudget = {
    id: 0,
    referenceId: '',
    spendCategoryId: 0,
    careHomeId: 0,
    name: '',
    dateFrom: '',
    dateTo: '',
    description: '',
    poPrefix: '',
    status: '',
    createdDate: '',
    updatedDate: '',
    createdBy: '',
    updatedBy: '',
    spendBudgetAllocations: [createInstanceOfSpendBudgetAllocation()]
  }
  return model;
}

export function createSpendBudgetListResponse() {
  let model: SpendBudgetListResponse = {
    id: 0,
    referenceId: '',
    name: '',
    dateFrom: '',
    dateTo: '',
    description: '',
    poPrefix: '',
    status: '',
    budgetTotal: 0,
    spendTotal: 0,
    careHomeName: '',
    spendCategoryName: ''
  }
}