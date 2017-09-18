import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'titlePipe'})
export class TitlePipe implements PipeTransform {
transform(value: string):string {
    value=value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return value.replace(/[^a-zA-Z ]/g,"")
  }
}
