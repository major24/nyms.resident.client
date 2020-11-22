import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Util {

  isDate(data: any): boolean {
    const d = new Date(data);
    return !Number.isNaN(d.getFullYear());
  }

  getIsoDateString(data: any): string {
    let str = '';
    if (this.isDate(data)) {
      str = new Date(data).toISOString().split('T')[0];
    }
    return str;
  }

  // old
  convertAngDateToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }

  convertStringDateToJsDate(date: string): Date {
    return new Date(date);
  }

}