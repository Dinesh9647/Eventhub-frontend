import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = null
  loggedIn: boolean = false
  isSuper: boolean = false
  isAdmin: boolean = false
  userLogin: boolean = true

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.token.getUser()
    this.loggedIn = this.token.loggedIn()
    this.isSuper = this.user.role == "super"
    this.isAdmin = this.user.role == "admin"
    this.userLogin = !window.location.href.includes('admin') 
  }

  logout() {
    this.token.signOut()
    this.loggedIn = false
    if (this.isAdmin || this.isSuper) 
      this.router.navigate(['/admin/login'])
      .then(() => {
        window.location.reload();
      });
    else
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }
}
