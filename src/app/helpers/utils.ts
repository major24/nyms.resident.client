import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Util {

  convertAngDateToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }

  convertStringDateToJsDate(date: string): Date {
    return new Date(date);
  }

}