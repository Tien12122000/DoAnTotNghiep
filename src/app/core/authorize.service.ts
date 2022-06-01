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
    // console.log(user);
     if(user){
      combineLatest([
        this.http.post('https://localhost:44399/api/Role/CheckRole',user['id'])
      ]).subscribe(res=>{
        return true;
      },err=>{
        // alert("Bạn ko có quyền truy cập");
        // window.location.reload
        
        return false;
      });
     }
     else{
       alert("Đăng nhập trước khi tiếp tục");
      this.router.navigate(['/Login']);
      return false;
     }
  }
}
