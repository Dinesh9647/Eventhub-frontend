import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8; multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  createEvent(params: any): Observable<any> {
    return this.http.post(this.apiUrl + '/events', params, httpOptions)
  }

  getEvents(params: any): Observable<any> {
    // console.log(params);
    let queryParams = new HttpParams()
    for (let key in params) {
      queryParams = queryParams.set(key, params[key]);
    }
    return this.http.get(this.apiUrl + '/events', {
      params: queryParams
    })
  } 

  getRegisteredEvents(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/users/${id}/bucket`)
  }

  getEvent(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/events/${id}`)
  }
}
