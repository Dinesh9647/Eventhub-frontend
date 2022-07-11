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
export class AdminAuthService {

  private apiUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/admin/login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(admin: any): Observable<any> {
    return this.http.post(this.apiUrl + '/admin/users', {
      username: admin.username,
      email: admin.email,
      password: admin.password,
      password_confirmation: admin.password_confirmation,
      role: "admin"
    }, httpOptions);
  }
}
