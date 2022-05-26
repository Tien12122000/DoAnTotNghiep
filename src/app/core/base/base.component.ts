import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
  public _api:ApiService;
  render: Renderer2;
  public unsubscribe = new Subject();
  constructor(inject:Injector) {
    this._api=inject.get(ApiService);
    this.render=inject.get(Renderer2);
  }


  createScriptElememt(src:string):HTMLScriptElement{
    let script=document.createElement('script');
    script.src=src;
    script.defer=true;
    script.async=true;
    script.type = 'text/javascript';
    this.render.appendChild(document.body,script);
    return script;
  }
  loadscript(){
    // this.createScriptElememt("assets/backend/vendors/jquery/dist/jquery.min.js").onload=()=>{

    // }
    this.createScriptElememt("assets/backend/vendors/jquery/dist/jquery.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/bootstrap/dist/js/bootstrap.bundle.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/fastclick/lib/fastclick.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/nprogress/nprogress.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Chart.js/dist/Chart.min.js").onload=()=>{

    }

    this.createScriptElememt("assets/backend/vendors/gauge.js/dist/gauge.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/iCheck/icheck.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/skycons/skycons.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Flot/jquery.flot.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Flot/jquery.flot.pie.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Flot/jquery.flot.time.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Flot/jquery.flot.stack.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/Flot/jquery.flot.resize.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/flot.orderbars/js/jquery.flot.orderBars.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/flot-spline/js/jquery.flot.spline.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/flot.curvedlines/curvedLines.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/DateJS/build/date.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/jqvmap/dist/jquery.vmap.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/jqvmap/dist/maps/jquery.vmap.world.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/moment/min/moment.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/vendors/bootstrap-daterangepicker/daterangepicker.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/build/js/custom.min.js").onload=()=>{

    }
    this.createScriptElememt("assets/backend/build/module_table.js").onload=()=>{

    }

  }

}
