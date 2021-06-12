import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


// const remoteApiEndpoint = 'http://daavsecurite.com/yea/yeaapi/core/';

const apiEndpoint = 'http://localhost/samaygnaw/api/core/mobile/';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  constructor(private http: HttpClient) { }

  getMeasurements(clientSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'client/measurements?sgi=' + clientSGI);
  }

  getClient(clientSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/viewclient?sgi=' + clientSGI);
  }

  getGnaws(saloonSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/viewgnaws?sgi=' + saloonSGI);
  }

}
