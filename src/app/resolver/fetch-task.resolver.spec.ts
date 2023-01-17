import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FetchTaskResolver } from './fetch-task.resolver';
import { TestBed } from '@angular/core/testing';
import { TodoService } from '../services/todo.service';

describe('FetchTaskResolver', () => {
  let resolver: FetchTaskResolver;
  let toDoServiceSpy: jasmine.SpyObj<TodoService>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TodoService', ['fetchList']);
    TestBed.configureTestingModule({
      providers: [
        { provide: TodoService, useValue: spy }
      ]
    });
    resolver = TestBed.inject(FetchTaskResolver);
    toDoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve - ', () => {
    it('should call fetchList', () => {
      resolver.resolve(route, state);

      expect(toDoServiceSpy.fetchList).toHaveBeenCalledTimes(1);
    });
  });
});
