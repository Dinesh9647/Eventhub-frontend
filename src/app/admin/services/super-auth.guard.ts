import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperAuthGuard implements CanActivate {

  constructor(
    private auth: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.auth.getUser();
      if(currentUser && currentUser.role === "super") {
        // console.log(true);
        return true;
      } else {
        // console.log(false);
        this.router.navigate(['/admin/events'])
        return false;
      }
  }
  
}
