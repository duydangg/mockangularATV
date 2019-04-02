import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    name: string;
    age: number;
    address: string;
}

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable()


export class DisplayService {
    constructor(private http: HttpClient) { 
        
    }

    private configUrl = './display.json';

    getJson(): Observable<any> {
        debugger
        return this.http.get(this.configUrl, httpOptions);
    }
}

