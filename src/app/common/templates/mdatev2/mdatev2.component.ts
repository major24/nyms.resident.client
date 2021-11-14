import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../helpers/index';

@Component({
  selector: 'mdatev2',
  templateUrl: './mdatev2.component.html',
  styleUrls: ['./mdatev2.component.css']
})
export class Mdatev2Component implements OnInit {
  @Input() dateValue: undefined;
  @Output() dateCtlV2SelectedEvent = new EventEmitter<any>();
  @Input() labelDateCtl: string = 'Date';
  @Input() DateCtlId: string = 'datectl';
  @Input() startYear: number = 0;

  datectlForm = new FormGroup({
    datectlv2: new FormControl(''),
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
          this.datectlForm.controls['datectlv2'].setValue({ year: Number(arr[0]), month: Number(arr[1]), day: Number(arr[2]) });
        }
      }
    }
  }

  onDateCtlV2DateSelect(event: any): void {
    const dateIn = `${event.year}-${event.month}-${event.day}`;
    const strDate = this.util.getIsoDateString(dateIn);
    this.dateCtlV2SelectedEvent.emit(strDate); //(`${event.year}-${event.month}-${event.day}`);
  }
  onDateCtlV2DateChange(event: any): void {
    this.dateCtlV2SelectedEvent.emit(this.util.getIsoDateString(event.target.value));
  }

}
