import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent } from './core/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ngAfterViewInit(): void {
  //   this.loadscript();
  // }
  title = 'admin';

}
