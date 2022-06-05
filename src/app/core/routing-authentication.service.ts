import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../admin/header/header.component';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingAuthenticationService implements CanActivate {

  constructor( private router: Router,
    private accountService: AccountServiceService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var user=JSON.parse(localStorage.getItem('accessToken'));
    // console.log(user);
    if(user){
      // this.router.navigate(['/admin/Dashboard']);
      HeaderComponent.info=user.user;
      console.log(HeaderComponent.info);
      return true;
    }
    this.router.navigate(['/Login']);
        return false;
  }
}
