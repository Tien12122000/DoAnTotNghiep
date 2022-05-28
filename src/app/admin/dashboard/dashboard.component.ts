import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { combineLatest, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector, private http: HttpClient) {
    super(injector);
   }
  billNumber:any;
  ngOnInit(): void {
    combineLatest([
      this._api.get("/api/DonHang/Get-Donhang-Number"),
    ]).subscribe(res=>{
      this.billNumber=res[0];
    }, err=>{
      throwError;
    })
  }
  ngAfterViewInit(): void {
    // this.loadscript();
  }
}
