import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users =  [
      {id: 1, name: 'Nguyen Duy Dang', age: 22, address: "Thai Nguyen", work: "Student", status:"none"},
      {id: 2, name: 'Nguyen Duy Tien', age: 22, address: "Thai Nguyen", work: "Student", status:"none"},
      {id: 3, name: 'Tran Duc Nam', age: 22, address: "Thai Nguyen", work: "Student", status:"none"},
      {id: 4, name: 'Vu Huy Hoang', age: 22, address: "Thai Nguyen", work: "Student", status:"none"},
      {id: 5, name: 'Duong Duc Anh', age: 22, address: "Thai Nguyen", work: "Student", status:"none"},
    ];
    return { users }
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
  
}
