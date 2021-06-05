import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Budget, BudgetListResponse, SpendRequest, TransferSpendRequest } from '../models/spend-budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private apiService: ApiService) { }

  loadBudgetsForAdmin(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.apiService.loadBudgetsForAdmin(startDate, endDate);
  }

  loadBudgetsForUser(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.apiService.loadBudgetsForUser(startDate, endDate);
  }

  loadBudgetsForSummryReport(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.apiService.loadBudgetsForSummryReport(startDate, endDate);
  }

  loadBudgetByReferenceId(referenceId: string): Observable<Budget> {
    return this.apiService.loadBudgetByReferenceId(referenceId);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.apiService.createBudget(budget);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.apiService.updateBudget(budget);
  }

  saveNewAmount(budget: Budget): Observable<Budget> {
    return this.apiService.saveNewAmount(budget);
  }

  createSpend(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.apiService.createSpend(spendRequest);
  }

  issueCreditNote(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.apiService.issueCreditNote(spendRequest);
  }

  transferSpend(transferSpendRequest: TransferSpendRequest): Observable<boolean> {
    return this.apiService.transferSpend(transferSpendRequest);
  }

}
