import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl: string = environment.baseUrl
  isRegistered = new Map()

  constructor(
    private eventService: EventsService,
    private auth: TokenStorageService,
    private http: HttpClient
  ) { 
    if (this.auth.loggedIn()) {
      const user = this.auth.getUser()
      this.eventService.getRegisteredEvents(user.id)
      .subscribe(
        res => {
          res.registrations.forEach((registration: any) => this.isRegistered.set(registration.event_id, "registered"))
          // console.log(this.isRegistered)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  registeredEvent(id: any): Boolean {
    console.log(id)
    console.log(this.isRegistered)
    return this.isRegistered.has(id)
  }

  registerEvent(id: any, event_id: any): Observable<any> {
    return this.http.post(this.apiUrl + `/users/${id}/register`, {
      event_id: event_id
    }, httpOptions)
  }
}
