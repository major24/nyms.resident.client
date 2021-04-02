import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'report-list-occup-fee',
  templateUrl: './report-list-occup-fee.component.html',
  styleUrls: ['./report-list-occup-fee.component.css']
})
export class ReportListOccupFeeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }



  isNumberArray(value: unknown): value is number[] {
    return (
      Array.isArray(value) &&
      value.every(element => typeof element === "number")
    );
  }

}
