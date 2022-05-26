import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private inject:Injector) {
    super(inject);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.loadscript();
  }
}
