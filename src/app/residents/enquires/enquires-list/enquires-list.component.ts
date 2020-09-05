import { Component, OnInit, Input } from '@angular/core';
import { EnquiryResident } from '../../models/index';

@Component({
  selector: 'enquires-list',
  templateUrl: './enquires-list.component.html',
  styleUrls: ['./enquires-list.component.css']
})
export class EnquiresListComponent implements OnInit {

  @Input() enquiryResident: EnquiryResident;

  constructor() { }

  ngOnInit(): void {
  }

  remove(referenceId: string){
    console.log('>>removing>>', referenceId);
  }

}

