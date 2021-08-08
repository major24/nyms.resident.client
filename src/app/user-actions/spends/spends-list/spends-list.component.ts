import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { BudgetService } from '../../../services/budget.service';
import { BudgetListResponse, createBudgetListResponse, SpendComments, createSpendComments } from '../../../models/spend-budgets';
import * as SpendStatusType from '../../../models/spend-status';

@Component({
  selector: 'spends-list',
  templateUrl: './spends-list.component.html',
  styleUrls: ['./spends-list.component.css']
})
export class SpendsListComponent implements OnInit {
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  closeResult = '';
  budget: BudgetListResponse = createBudgetListResponse();
  referenceId: string = '';

  selectedSpendId: number = 0;
  SpendStatus = SpendStatusType.SpendStatus;
  spendComments: SpendComments = createSpendComments();

  createAddSpendCommentForm = new FormGroup({
    comments: new FormControl(''),
    spendStatusSelect: new FormControl('')
  });

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private budgetService: BudgetService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        this.loadBudgetByReferenceId(this.referenceId);
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
          console.log('>>budget', data);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching budgets', error);
          this.loading = false;
        }
      });
  }

  onCommentsChange(event: any): void {
    this.spendComments = Object.assign(this.spendComments, { comments:  event.target.value });
  }

  onSpendStatusSelectChange(event: any): void {
    this.spendComments = Object.assign(this.spendComments, { status:  +event.target.value });
  }

  createSpendComment() {
    this.error = '';
    this.spendComments = Object.assign(this.spendComments, { spendId: this.selectedSpendId });
    if (this.spendComments.spendId <= 0) {
      this.error = 'Error: Spend Id not selected';
      return;
    }
    if (!this.spendComments.comments) {
      this.error = 'Comment is required';
      return;
    }
    if (!this.spendComments.status) {
      this.error = 'Status is required';
      return;
    }
    console.log('rdy to submit spend cmts', this.spendComments);

    this.saving = true;
    this.budgetService.createSpendComment(this.spendComments)
    .subscribe({
      next: (data) => {
        console.log('Data saved');
        this.saving = false;
        // reload the page
        this.loadBudgetByReferenceId(this.referenceId);
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.log('Error saving spend comments', error);
        this.saving = false;
      }
    });
  }





    // open from template
    openModal(content: any, id: number) {
      this.selectedSpendId = +id;
      this.error = '';
      if (this.selectedSpendId <= 0) return;

      this.createAddSpendCommentForm.controls['comments'].setValue('');
      this.createAddSpendCommentForm.controls['spendStatusSelect'].setValue('');

      this.open(content);
    }
    // private
    open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }




}
