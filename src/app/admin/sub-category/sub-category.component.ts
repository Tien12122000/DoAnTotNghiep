import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private inject:Injector) {
    super(inject);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.loadscript();
  }

}
