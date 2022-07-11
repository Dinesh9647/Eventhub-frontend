import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: any = [];

  constructor(private authService: AdminAuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.tokenStorage.loggedIn()) {
      this.router.navigate(['/admin/events'])
    }
  }

  registerAdmin() {
    this.authService.register(this.form).subscribe(
      res => {
        // this.tokenStorage.saveToken(res.token);
        // this.tokenStorage.saveUser(res.user);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/admin/events'])
      },
      err => {
        this.errorMessage = err.error.errors[0];
        this.isSignUpFailed = true;
      }
    );
  }

}
