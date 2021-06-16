/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


const apiEndpoint = 'http://localhost/samaygnaw/api/core/mobile/saloon/';


const httpOptions = {

  headers: new HttpHeaders({
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  logUserIn(userData): Observable<any> {

    return this.http.post(apiEndpoint + 'login.php', JSON.stringify(userData), httpOptions);

  }

}
