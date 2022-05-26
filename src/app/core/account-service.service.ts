import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private userSubject:BehaviorSubject<any>;
  private user:Observable<any>;
  isLoadingSubject: BehaviorSubject<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  private authLocalStorageToken='accessToken'
  constructor(private router:Router, private http:HttpClient) {
    this.userSubject=new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user=this.userSubject.asObservable();
   }
   public get userValue() : any {
     return this.userSubject.value;
   }
   loginGoogle(accessToken): Observable<any> {
    const options = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.host  +'/api/GoogleAuth/Login-Google-Account/', JSON.stringify(accessToken), {headers:options}).pipe(
      map((auth: any) => {
        console.log(auth);
        const result = this.setAuthFromLocalStorage(auth);
        this.router.navigate(['/admin']);
        console.log(result);
        return result;
      }),
      catchError((err) => {
        // alert("Tài khoản hoặc mật khẩu không đúng");
        console.error('err', err);
        return undefined;
      }),
      // finalize(() => this.isLoadingSubject.next(false))
    );
  }
  private setAuthFromLocalStorage(auth: any): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(this.authLocalStorageToken);
    this.userSubject.next(null);
    this.router.navigate(['/Login']);
  }
}
