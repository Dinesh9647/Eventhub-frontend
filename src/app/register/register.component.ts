import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: any = [];

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.loggedIn()) 
      this.router.navigate(['/events'])
  }

  registerUser() {
    this.authService.register(this.form).subscribe(
      res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res.user);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/events'])
        .then(() => {
          window.location.reload()
        })
      },
      err => {
        this.errorMessage = err.error.errors[0];
        this.isSignUpFailed = true;
      }
    );
  }
}
