import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService implements CanActivate{

  http:any;
  constructor(http: HttpClient, private router: Router) {
    this.http=http;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var user=JSON.parse(localStorage.getItem('accessToken'));
     if(user){
       var bool;
        if(user.role=='admin'){
          bool=true;
        }
        if(bool!=true){
          this.router.navigate(['/Unauthorize']);
          return false;
        }
      return bool;
     }
     else{
        alert("Đăng nhập trước khi tiếp tục");
        this.router.navigate(['/Login']);
        return false;
     }
  }
}
