import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { SpendBudgetListResponse, createSpendBudgetListResponse } from '../../../models/spend-budgets';

@Component({
  selector: 'spends-list',
  templateUrl: './spends-list.component.html',
  styleUrls: ['./spends-list.component.css']
})
export class SpendsListComponent implements OnInit {
  loading: boolean = false;
  spendBudget: SpendBudgetListResponse = createSpendBudgetListResponse();

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private budgetService: BudgetService) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        this.loadBudgetAndSpendsByReferenceId(referenceId);
      }
    });
  } //ngonit

  loadBudgetAndSpendsByReferenceId(refereneId: string): void {
    this.loading = true;
    this.budgetService.loadBudgetAndSpendsByReferenceId(refereneId)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.spendBudget = Object.assign(this.spendBudget, data);

        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching budgets', error);
        this.loading = false;
      }
    });
  }



}
