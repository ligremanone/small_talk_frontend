import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) return null
    return 'http://127.0.0.1:8000/' + value;
  }

}
