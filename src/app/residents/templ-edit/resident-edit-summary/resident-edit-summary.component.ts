import { Component, OnInit, Input } from '@angular/core';
import { Resident, createInstanceOfResident } from '../../models/index';

@Component({
  selector: 'resident-edit-summary',
  templateUrl: './resident-edit-summary.component.html',
  styleUrls: ['./resident-edit-summary.component.css']
})
export class ResidentEditSummaryComponent implements OnInit {
  @Input() resident: Resident = createInstanceOfResident();

  constructor() { }

  ngOnInit(): void {
  }

}
