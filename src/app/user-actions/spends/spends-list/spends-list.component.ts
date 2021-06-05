import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { BudgetListResponse, createBudgetListResponse } from '../../../models/spend-budgets';

@Component({
  selector: 'spends-list',
  templateUrl: './spends-list.component.html',
  styleUrls: ['./spends-list.component.css']
})
export class SpendsListComponent implements OnInit {
  loading: boolean = false;
  budget: BudgetListResponse = createBudgetListResponse();

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private budgetService: BudgetService) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        this.loadBudgetByReferenceId(referenceId);
      }
    });
  } //ngonit

  loadBudgetByReferenceId(refereneId: string): void {
    this.loading = true;
    this.budgetService.loadBudgetByReferenceId(refereneId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.budget = Object.assign(this.budget, data);
          console.log('>>', data);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }



}
