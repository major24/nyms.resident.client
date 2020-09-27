import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitPipe'
})
export class SplitPipe implements PipeTransform {

  transform(text: string, by: string, index: number = 1) {
    let arr = text.split(by); // split text by "by" parameter
    return arr[index] // after splitting to array return wanted index
  }
}
