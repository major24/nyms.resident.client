import { BudgetTypes } from './budget-types';

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
  budgetType: BudgetTypes;
  budgetMonth: number;
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
  numberOfMonths: number;
}

export interface BudgetListResponse {
  id: number;
  referenceId: string;
  name: string,
  budgetType: BudgetTypes;
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
  spends: Spend[];
  careHomeId: number;
}

export interface SpendRequest {
  budgetId: number;
  amount: number;
  spendComments: SpendComments;
  poNumber: string;
  tranType: string;
}

export interface Spend {
  id: number;
  budgetId: number;
  poNumber: string;
  amount: number;
  spendComments: SpendComments[];
  createdByName: string;
  createdDate: string;
}

export interface SpendComments {
  spendId: number;
  comments: string;
  status: string;
  createdDate: string;
  createdByName: string;
}

export interface TransferSpendRequest {
  transferFromSpendId: number;
  transferToBudgetReferenceId: string;
  comments: string;
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
    budgetType: BudgetTypes.Monthly,
    budgetMonth: 0,
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
    numberOfMonths: 0
  }
  return model;
}

export function createBudgetListResponse() {
  let model: BudgetListResponse = {
    id: 0,
    referenceId: '',
    name: '',
    budgetType: null,
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
    spends: [createSpend()]
  }
  return model;
}

export function createSpendComments() {
  let model: SpendComments = {
    spendId: 0,
    comments: '',
    status: '',
    createdDate: '',
    createdByName: ''
  }
  return model;
}

export function createSpendRequest() {
  let model: SpendRequest = {
    budgetId: 0,
    amount: 0,
    spendComments: createSpendComments(),
    poNumber: '',
    tranType: ''
  }
  return model;
}

export function createSpend() {
  let model: Spend = {
    id: 0,
    budgetId: 0,
    poNumber: '',
    amount: 0,
    createdByName: '',
    createdDate: '',
    spendComments: []
  }
  return model;
}

