export interface BudgetAllocation {
  id: number;
  budgetId: number;
  amount: number;
  approved: string;
  approvedDate: string;
  approvedBy: string;
  approvedById: number;
  reason: string;
}

export interface Budget {
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
  budgetAllocations: BudgetAllocation[];
}

export interface BudgetListResponse {
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
  vatTotal: number;
  careHomeName: string;
  spendCategoryName: string;
  spendResponses: spendResponse[];
  careHomeId: number;
}

export interface SpendRequest {
  budgetId: number;
  amount: number;
  vat: number;
  notes: string;
  poNumber: string;
}

export interface spendResponse {
  id: number;
  budgetId: number;
  poNumber: string;
  amount: number;
  vat: number;
  notes: string;
  createdByName: string;
  createdDate: string;
}

export function createInstanceOfBudgetAllocation() {
  let model: BudgetAllocation = {
    id: 0,
    budgetId: 0,
    amount: null,
    approved: '',
    approvedDate: '',
    approvedBy: '',
    approvedById: 0,
    reason: ''
  }
  return model;
}

export function createInstanceOfBudget() {
  let model: Budget = {
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
    budgetAllocations: [createInstanceOfBudgetAllocation()]
  }
  return model;
}

export function createBudgetListResponse() {
  let model: BudgetListResponse = {
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
    vatTotal: 0,
    careHomeName: '',
    spendCategoryName: '',
    careHomeId: 0,
    spendResponses: [createSpendResponse()]
  }
  return model;
}

export function createSpendRequest() {
  let model: SpendRequest = {
    budgetId: 0,
    amount: 0,
    vat: 0,
    notes: '',
    poNumber: ''
  }
  return model;
}

export function createSpendResponse() {
  let model: spendResponse = {
    id: 0,
    budgetId: 0,
    poNumber: '',
    amount: 0,
    vat: 0,
    notes: '',
    createdByName: '',
    createdDate: ''
  }
  return model;
}