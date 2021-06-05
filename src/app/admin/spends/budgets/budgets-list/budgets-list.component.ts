import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { BudgetListResponse } from '../../../models/index';
import { BudgetListResponse } from '../../../../models/spend-budgets';
import { BudgetService } from '../../../../services/budget.service';
import { Util } from '../../../../helpers/utils';

@Component({
  selector: 'budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent implements OnInit {
  budgets: BudgetListResponse[] = []
  loading: boolean = false;
  error: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private router: Router,
    private budgetService: BudgetService,
    private readonly util: Util) { }

  ngOnInit(): void {
    this.startDate = this.util.getFirstDayOfTheMonth();
    this.endDate = this.util.getLastDayOfTheMonth();
    this.loadBudgetsForAdmin(this.startDate, this.endDate);
  }

  navToAddBudget(): void {
    this.router.navigate(['/admin/budgets-add', {}]);
  }

  navToEditBudget(referenceId: string): void {
    this.router.navigate(['/admin/budgets-edit', referenceId]);
  }

  onStartDateChange(event: any): void {
    this.startDate = event;
  }

  onEndDateChange(event: any): void {
    this.endDate = event;
  }

  getBudgetsByDate(): void {
    if (this.endDate === '' || this.startDate === '') return;
    this.loadBudgetsForAdmin(this.startDate, this.endDate);
  }

  loadBudgetsForAdmin(startDate: string, endDate: string): void {
    this.loading = true;
    this.budgets = Object.assign([], []);
    this.budgetService.loadBudgetsForAdmin(startDate, endDate)
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
