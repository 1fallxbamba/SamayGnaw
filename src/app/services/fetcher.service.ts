import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


// const remoteApiEndpoint = 'http://online////';

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

  getClientIdentity(clientSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'client/identify?sgi=' + clientSGI);
  }

  getClientInfo(clientSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'client/info?sgi=' + clientSGI);
  }

  getClientsGnaws(clientSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'client/gnaws?sgi=' + clientSGI);
  }

  getSaloonIdentity(saloonSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/identify?sgi=' + saloonSGI);
  }

  getSaloonInfo(saloonSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/info?sgi=' + saloonSGI);
  }

  getSaloonsGnaws(saloonSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/viewgnaws?sgi=' + saloonSGI);
  }

  getSaloonsClients(saloonSGI): Observable<any> {
    return this.http.get(apiEndpoint + 'saloon/viewclients?sgi=' + saloonSGI);
  }

}
