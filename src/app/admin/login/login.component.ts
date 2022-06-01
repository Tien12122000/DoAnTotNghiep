import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { combineLatest } from 'rxjs';
import { AccountServiceService } from 'src/app/core/account-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: SocialUser = new SocialUser;
  title = 'GoogleLogin';
  constructor( private socialAuthService: SocialAuthService, private httpclient:HttpClient,
    private accountService:AccountServiceService, private router:Router) {
    // super(props);

  }
  ngOnInit(): void {

      // google service
      // this.socialAuthService.authState.subscribe(user => {
      //   this.user = user;
      //   console.log(user);
      // });
      // moment().add(1234,'second');
  }
  // google service
public signInWithGoogle(): void {
  var GoogleAuthRes={};
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{

    // console.log(res);

    var result;
    this.accountService.loginGoogle(res.authToken).subscribe(respo=>{
      result=respo;

    },
    err=>{
      this.router.navigate(['/Login']);
      alert("Tên tài khoản hoặc mật khẩu không đúng");
    });
    // if(result!=undefined){
    //   this.router.navigate(['/admin/Dashboard']);
    // }
    // else{
    //   alert("Tên tài khoản hoặc mật khẩu không đúng");
    // }
  });
}
public signOut(): void {
  this.socialAuthService.signOut();
}
}
