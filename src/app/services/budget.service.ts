import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Budget, BudgetListResponse, SpendRequest } from '../models/spend-budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private apiService: ApiService) { }

  loadBudgetsForAdmin(): Observable<BudgetListResponse[]> {
    return this.apiService.loadBudgetsForAdmin();
  }

  loadBudgetsForUser(): Observable<BudgetListResponse[]> {
    return this.apiService.loadBudgetsForUser();
  }

  loadBudgetAndAllocationsByReferenceId(referenceId: string): Observable<Budget> {
    return this.apiService.loadBudgetAndAllocationsByReferenceId(referenceId);
  }

  loadBudgetAndSpendsByReferenceId(referenceId: string): Observable<Budget> {
    return this.apiService.loadBudgetAndSpendsByReferenceId(referenceId);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.apiService.createBudget(budget);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.apiService.updateBudget(budget);
  }

  createSpend(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.apiService.createSpend(spendRequest);
  }
}
