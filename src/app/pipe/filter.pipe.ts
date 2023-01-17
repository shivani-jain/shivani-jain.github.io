import { Pipe, PipeTransform } from '@angular/core';

import { TodoTask } from 'src/app/models/todo-task';

/**
 * This pipe filters the task list based on the task name
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: TodoTask[], filter: { taskName: string }): any {
    if (!items || filter.taskName.length === 0) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.taskName.toLowerCase().indexOf(filter.taskName.toLowerCase()) !== -1);
  }

}
