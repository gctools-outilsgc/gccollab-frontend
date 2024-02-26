import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateFileName',
})
export class TruncateFileNamePipe implements PipeTransform {
  transform(fileName: string, maxLength: number): string {
    const extension = fileName.split('.').pop();

    if (extension) {
      if (fileName.length - extension.length <= maxLength) {
        return fileName;
      }
      const truncatedName = fileName.substring(0, maxLength);

      return `${truncatedName}...${extension}`;
    }

    return fileName;
  }
}
