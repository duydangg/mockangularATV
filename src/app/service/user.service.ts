import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { User } from '../user';

const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer fake-jwt-token'
    })
  };

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }


    getAll() {
        //JSON.parse(localStorage.getItem('users'));
        return this.http.get<User[]>(`/users`,httpOptions);
    }

    getById(id: number) {
        return this.http.get(`/user/` + id);
    }

    register(user: User) {
        
        return this.http.post(`/register`, user);
    }

    update(user: User, id) {
        return this.http.put(`/users/`+id, user, httpOptions);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id, httpOptions);
    }

    searchUsers(term: string): Observable<User[]> {
        if (!term.trim()) {
          // if not search term, return empty hero array.
          return of([]);
        }
        return this.http.get<User[]>(`users/?name=${term}`, httpOptions);
        
      }
}