import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpendBudgetListResponse } from '../../../models/index';
import { BudgetService } from '../../../../services/budget.service';

@Component({
  selector: 'budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent implements OnInit {
  spendBudgets: SpendBudgetListResponse[] = []
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router,
    private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadBudgetsForAdmin();
  }

  navToAddBudget(): void {
    this.router.navigate(['/admin/budgets-add', {}]);
  }

  loadBudgetsForAdmin(): void {
    this.loading = true;
    this.budgetService.loadBudgetsForAdmin()
    .subscribe({
      next: (data) => {
        Object.assign(this.spendBudgets, [...data]);
        console.log(this.spendBudgets);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching budgets', error);
        this.loading = false;
      }
    });
  }



}
