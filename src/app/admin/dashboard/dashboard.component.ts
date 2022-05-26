import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private inject:Injector) {
    super(inject);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.loadscript();
  }
}
