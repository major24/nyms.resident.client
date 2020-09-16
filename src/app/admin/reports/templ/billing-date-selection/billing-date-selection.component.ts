import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyPair } from '../../../../models/index';
import { Output, EventEmitter } from '@angular/core';
import { FileService } from '../../../../services/index';
import { saveAs } from 'file-saver';

@Component({
  selector: 'billing-date-selection',
  templateUrl: './billing-date-selection.component.html',
  styleUrls: ['./billing-date-selection.component.css']
})
export class BillingDateSelectionComponent implements OnInit {

  invoiceForm = new FormGroup({
    billingStartDate: new FormControl('', [Validators.required]),
    billingEndDate: new FormControl('', [Validators.required]),
    localAuthority: new FormControl('')
  });

  billingStart: string;
  billingEnd: string;
  downloading: boolean = false;

  @Output() localAuthorityChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();

    // LA for dropdown
    localAuthrities: KeyPair[] = [
      { key:'all', value:'All'},
      { key: '1', value: 'Derbyshire County Council'},
      { key: '2', value:'Manchester City Council'},
      { key: '3', value:'Tameside Metropolitan Borough Council'},
      { key: '101', value:'Private'}
    ];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    // const blob = new Blob([''], { type: 'application/octet-stream' });
  }

  onBillingStartDateChange(event: any): void {
    if (event) {
      this.billingStart = `${event.year}-${event.month}-${event.day}`;
    }
  }

  onBillingEndDateChange(event: any): void {
    if (event) {
      this.billingEnd = `${event.year}-${event.month}-${event.day}`;
    }
  }

  onLocalAuthorityChange(event: any): void {
    this.localAuthorityChangedEvent.emit(event);
  }


  getReportsByDate(): void {
    if (this.billingStart && this.billingEnd) {
      this.getReportEvent.emit({ billingStart: this.billingStart, billingEnd:this.billingEnd })
    }
  }

  downloadReportsByDate() {
    // const url = `/api/invoices/all/2020-09-01/2020-09-10/download`;
    this.downloading = true;
    this.fileService.downloadFile(this.billingStart, this.billingEnd).subscribe(response => {
			//let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			//const url= window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
      saveAs(response, `invoice-${this.billingStart}-${this.billingEnd}.csv`);
      this.downloading = false;
		}), error => console.log('Error downloading the file'),
    () => console.info('File downloaded successfully');
  }

}
