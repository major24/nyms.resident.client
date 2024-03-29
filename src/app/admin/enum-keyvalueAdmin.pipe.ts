import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'enumKeyValueAdmin'})
export class EnumKeyValueAdminPipe implements PipeTransform {
  transform(enm: any): any {
    return Object.getOwnPropertyNames(enm).filter((e)=> {
      return parseInt(e,10)>=0;
    }).map((e) => {
      return { key: enm[e], value: e }
    });
  }
}