import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../helpers/index';

@Component({
  selector: 'mdate',
  templateUrl: './mdate.component.html',
  styleUrls: ['./mdate.component.css']
})
export class MdateComponent implements OnInit {
  @Input() dateValue: undefined;
  @Output() dateCtlSelectedEvent = new EventEmitter<any>();
  @Input() labelDateCtl: string = 'Date';
  @Input() DateCtlId: string = 'datectl';
  @Input() startYear: number = 0;

  datectlForm = new FormGroup({
    datectl: new FormControl(''),
  });

  constructor(private readonly util: Util) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any): void {
    if (changes.dateValue && changes.dateValue.currentValue) {
      const val = changes.dateValue.currentValue;
      if (this.util.isDate(val)) {
        // Ang requires 3 parts of dates. parse
        const dateFmt = this.util.getIsoDateString(val);
        const arr: string[] = dateFmt.split('-');
        if (arr.length === 3) {
          this.datectlForm.controls['datectl'].setValue({ year: Number(arr[0]), month: Number(arr[1]), day: Number(arr[2]) });
        }
      }
    }

    if (changes.startYear && changes.startYear.currentValue > 1900) {
      this.datectlForm.controls['datectl'].setValue({ year: Number(changes.startYear.currentValue), month: 1, day: 1 });
    }
  }

  onDateCtlDateSelect(event: any): void {
    const dateIn = `${event.year}-${event.month}-${event.day}`;
    const strDate = this.util.getIsoDateString(dateIn);
    this.dateCtlSelectedEvent.emit(strDate); //(`${event.year}-${event.month}-${event.day}`);
  }
  onDateCtlDateChange(event: any): void {
    this.dateCtlSelectedEvent.emit(this.util.getIsoDateString(event.target.value));
  }

}
