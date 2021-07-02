/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


// const remoteApiEndpoint = 'http://online////';

const apiEndpoint = 'http://localhost/samaygnaw/api/core/mobile/';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })

};

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(private http: HttpClient) { }

  postClient(clientData): Observable<any> {
    return this.http.post<any>(apiEndpoint + 'saloon/addclient',  JSON.stringify(clientData), httpOptions);
  }

  postGnaw(gnawData): Observable<any> {
    return this.http.post<any>(apiEndpoint + 'saloon/addgnaw',  JSON.stringify(gnawData), httpOptions);
  }


}
