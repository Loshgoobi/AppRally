import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

declare var cordova: any;

//const url = "http://localhost:3002/api";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://rest.pksoft.fr";
const token = "5BCF5E3581A64AB8866EBBB8D2607888";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  results = this.socket.fromEvent<any>('resultAdded');

  constructor(private http: HttpClient, private socket:Socket) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  /*
  getResults(): Observable<any> {
    return this.http.get(url + '/results', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getResultBySpecial(idSpecial: string): Observable<any> {
    //this.socket.emit("getResultsBySpecial");
    this.socket.emit("add result");
    return this.http.get(url +'/results/special/' + idSpecial, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
    }

  getResultByCrew(idCrew: string): Observable<any> {
    return this.http.get(url +'/results/crew/' + idCrew, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  */

  getResultsBySpecial(special_id) : Observable<any> {
    return this.http.get(proxyurl + url + '/classification/1/1757/1/' + special_id + '/all/0/' + token, httpOptions);
  }

}
