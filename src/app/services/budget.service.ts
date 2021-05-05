import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { SpendBudget, SpendBudgetListResponse, SpendRequest } from '../models/spend-budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private apiService: ApiService) { }

  loadBudgetsForAdmin(): Observable<SpendBudgetListResponse[]> {
    return this.apiService.loadBudgetsForAdmin();
  }

  loadBudgetsForUser(): Observable<SpendBudgetListResponse[]> {
    return this.apiService.loadBudgetsForUser();
  }

  loadBudgetAndAllocationsByReferenceId(referenceId: string): Observable<SpendBudget> {
    return this.apiService.loadBudgetAndAllocationsByReferenceId(referenceId);
  }

  loadBudgetAndSpendsByReferenceId(referenceId: string): Observable<SpendBudget> {
    return this.apiService.loadBudgetAndSpendsByReferenceId(referenceId);
  }

  createBudget(spendBudget: SpendBudget): Observable<SpendBudget> {
    return this.apiService.createBudget(spendBudget);
  }

  updateBudget(spendBudget: SpendBudget): Observable<SpendBudget> {
    return this.apiService.updateBudget(spendBudget);
  }

  createSpend(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.apiService.createSpend(spendRequest);
  }
}
