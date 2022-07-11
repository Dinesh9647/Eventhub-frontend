import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form: any = {}
  isLoggedIn = false
  errorMessage = ''
  isLoginFailed = false

  constructor(private authService: AdminAuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    if(this.tokenStorage.loggedIn()) {
      this.router.navigate(['/admin/events'])
    }
  }

  ngOnInit(): void {

  }

  loginAdmin () {
    this.authService.login(this.form)
    .subscribe(
      res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res.user);

        this.isLoggedIn = true
        this.isLoginFailed = false;
        this.router.navigate(['/admin/events'])
          .then(() => {
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
