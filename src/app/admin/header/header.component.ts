import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/account-service.service';
import { BaseComponent } from 'src/app/core/base/base.component';

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

  }

  ngAfterViewInit(): void {
    this.loadscript();
  }
  logout(){
    this.accountService.logout();
  }
}
