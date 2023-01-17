import { FilterPipe } from './filter.pipe';
import { TodoTask } from '../models/todo-task';

describe('FilterPipe - ', () => {
  const mockTaskList: TodoTask[] = [{ "taskName": "taskName 2", "completed": true, "id": "2" }, { "taskName": "taskName 3", "completed": true, "id": "3" }, { "taskName": "taskName 4-1", "completed": false, "id": "4", "isEditing": true }, { "taskName": "taskName 5", "completed": false, "id": "5" }]
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform - ', () => {
    it('should filter tasks based on string', () => {
      const pipe = new FilterPipe();

      expect(pipe.transform(mockTaskList, { taskName: '4-1' })).toEqual([mockTaskList[2]]);
    });
  });
});
