import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';




const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Promise returns after 1.5 second!');
  }, 1500);
});

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private inject:Injector, private router: ActivatedRoute) {
    super(inject);
  }
  tui:any;
  promise:any;
  ngOnInit(): void {
    let id;
    let tuiXach;
    this.router.params.subscribe(res=>{
      id=res['id'];
    });
    // combineLatest([
      tuiXach=this._api.get("/api/TuiXach/Get-Tui-by-ID/"+id).toPromise();
      tuiXach.then((data)=>{
        this.tui = data
      }).catch((error)=>{
        console.log("Promise rejected with " + JSON.stringify(error));
      });
      console.log(this.tui);
      // console.log(this.tui);
    // ]).subscribe(res=>{
    //   // this.promise= Promise.resolve(res[0]).then((val)=>{return val});
    //   tuiXach=res[0];
    //   // console.log(response[0]['maTuiXach'])


    // });
    // this.promise.then((val)=>{return tuiXach=val});
    // console.log(this.promise);
  }

  ngAfterViewInit(): void {

    // this.loadscript();

  }

}
