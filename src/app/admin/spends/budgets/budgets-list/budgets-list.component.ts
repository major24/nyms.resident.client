import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { BudgetListResponse } from '../../../models/index';
import { BudgetListResponse } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';

@Component({
  selector: 'budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent implements OnInit {
  budgets: BudgetListResponse[] = []
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

  navToEditBudget(referenceId: string): void {
    this.router.navigate(['/admin/budgets-edit', referenceId]);
  }

  loadBudgetsForAdmin(): void {
    this.loading = true;
    this.budgetService.loadBudgetsForAdmin()
      .subscribe({
        next: (data) => {
          Object.assign(this.budgets, [...data]);
          console.log(this.budgets);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }



}
