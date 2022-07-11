import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl + '/tags')
  }

  setTags(id: any, tags: Array<number>): Observable<any> {
    return this.http.post(this.apiUrl + `/events/${id}/tags`, {
      tags: tags
    }, httpOptions)
  }
}
