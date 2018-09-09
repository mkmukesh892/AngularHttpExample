import { Injectable } from '@angular/core';
import {Headers,Http, Response} from '@angular/http';
import { Observable } from '../../node_modules/rxjs';
import 'rxjs/Rx';
import { map } from '../../node_modules/rxjs/operators';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = 'https://httpexample1.firebaseio.com/data.json';
  constructor(private http: Http) { }
  storeServers(servers: any[]) {
    const headers1 = new Headers({'Content-Type': 'application/json'});
    // return this.http.post(this.url, servers, {headers: headers1});
    return this.http.put(this.url, servers,{headers: headers1});
  }
  getServers() {
    return this.http.get(this.url).pipe(map(
      (response: Response) => {
        const servers: any = response;
        for (const server of servers) {
          server.name = 'Fetching_' + server.name
        }
        return servers;
      },
      (error: Response) => {console.log(error)}
    ),
    catchError(
      (error: any) => { return throwError('something went wrong!');}
    ));
  }
  getServersData() {
    return this.http.get(this.url).map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_'+ server.name;
        }
        return data;
      }
    ).catch(
      (error: Response) => {
      return Observable.throw('something gone a wrong');}
    );
  }
  getAppName() {
    return this.http.get('https://httpexample1.firebaseio.com/appName.json').map(
      (data: Response) => { return data.json();}
    );
  }
}
