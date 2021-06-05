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

export interface Recurrence {
  startMonth: number;
  numberOfMonths: number;
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
  reason: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  budgetAllocations: BudgetAllocation[];
  recurrence: Recurrence;
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
  notes: string;
  poNumber: string;
  tranType: string;
}

export interface spendResponse {
  id: number;
  budgetId: number;
  poNumber: string;
  amount: number;
  notes: string;
  createdByName: string;
  createdDate: string;
}

export interface TransferSpendRequest {
  transferFromSpendId: number;
  transferToBudgetReferenceId: string;
  notes: string;
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
    reason: '',
    createdDate: '',
    updatedDate: '',
    createdBy: '',
    updatedBy: '',
    budgetAllocations: [createInstanceOfBudgetAllocation()],
    recurrence: { startMonth: 0, numberOfMonths: 0 }
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
    notes: '',
    poNumber: '',
    tranType: ''
  }
  return model;
}

export function createSpendResponse() {
  let model: spendResponse = {
    id: 0,
    budgetId: 0,
    poNumber: '',
    amount: 0,
    notes: '',
    createdByName: '',
    createdDate: ''
  }
  return model;
}