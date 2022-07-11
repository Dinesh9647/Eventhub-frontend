import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {}
  isLoggedIn = false
  errorMessage = ''
  isLoginFailed = false

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.loggedIn()) 
      this.router.navigate(['/events'])
  }

  loginUser () {
    this.authService.login(this.form)
    .subscribe(
      res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res.user);

        this.isLoggedIn = true
        this.isLoginFailed = false;
        this.router.navigate(['/events']).then(() => {
          window.location.reload();
        });
      },
      err => {
        // console.log(err)
        this.errorMessage = err.error.errors[0]
        this.isLoginFailed = true
      }
    ) 
  }
}
