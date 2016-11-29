import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByGos'
})

export class FilterByGos implements PipeTransform {
  transform(value: any[], arg1: any, arg2: string): any {
    if (value) {
      let args = [arg1, arg2];
      const typeGos = ['ош', 'г', 'шл', 'л', 'шг' ];
      const type = args[0];
      const searchValue = (args[1]) ? args[1].toLowerCase() : undefined;

      if (!arg1 && !arg2) {
        return value;
      }

      return value.filter((school: any, index: number) => {
        if (!type && searchValue) {
          if (school.name.toLowerCase().indexOf(searchValue) !== -1) {
            return school;
          }
        }

        if (type === 'ош') {
          if (typeGos.indexOf(school.type) !== -1) {
            if (searchValue) {
              if (school.name.toLowerCase().indexOf(searchValue) !== -1) {
                return school;
              }
            } else {
              return school;
            }
          }
        } else {
          if (searchValue && school.type === type) {
            if (school.name.toLowerCase().indexOf(searchValue) !== -1) {
              return school;
            }
          }
          if (!searchValue) {
            return school.type === type;
          }
        }
      });
    }
  }
}
