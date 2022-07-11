import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEventsService {

  private apiUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
    private auth: TokenStorageService
  ) { }

  getAllEvents(): Observable<any> {
    const user = this.auth.getUser()
    return this.http.get(this.apiUrl + `/admin/users/${user.id}/events`)
  }

  getAllParticipants(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/events/${id}/participants`)
  }
}
