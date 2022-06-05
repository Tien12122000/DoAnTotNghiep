import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/account-service.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private inject:Injector,private accountService:AccountServiceService) {
    super(inject);
  }
  ngOnInit(): void {
    // console.log(HeaderComponent.GetUser());
  }

  ngAfterViewInit(): void {
    this.loadscript();
    this.picture=HeaderComponent.info.picture;
    this.name=HeaderComponent.info.family_name;
  }
  logout(){
    this.accountService.logout();
  }
  static info:any;
  picture:any;
  name:any;
}
