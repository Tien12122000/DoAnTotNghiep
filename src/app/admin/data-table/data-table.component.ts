import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, throwError } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent extends BaseComponent implements OnInit, AfterViewInit {


  constructor(private inject:Injector, private router:Router) {
    super(inject);
  }
  list:any;
  currentPageNumber=1;
  listPage;
  ngOnInit(): void {
    combineLatest([
      this._api.get("/api/TuiXach/Tui-page/1"),
      this._api.get("/api/TuiXach/Get-Row-total-tui-records"),
    ]).subscribe(res=>{
      this.list=res[0];
      this.listPage=res[1];
      console.log(this.list);
    }, err=>{
      throwError;
    })
  }
  ngAfterViewInit(): void {
    this.loadscript();
  }
  next(){
    // debugger;
      if((this.listPage != null && this.list != "") || this.listPage.length > 0){
        if(this.currentPageNumber < this.listPage.length && this.currentPageNumber>=1){
          this.currentPageNumber+=1;
          // if(this.currentPageNumber >= this.list.length){
          //   this.currentPageNumber = this.list.length;
          // }

        }
        combineLatest([
          this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber)
        ]).subscribe(res=>{
          this.list = res[0];
            console.log(this.listPage);
            console.log(this.currentPageNumber);
            setTimeout(() => {
              // this.loadscript();
            });
          });
      }

  }
  previous(){
    if((this.list != null)){
      if(this.currentPageNumber <= this.listPage.length && this.currentPageNumber>1){
        this.currentPageNumber-=1;
        if(this.currentPageNumber<1) this.currentPageNumber=1;

      }
      combineLatest([
        this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber),
      ]).subscribe(res => {
        this.list = res[0];
        console.log(this.list);
        console.log(this.currentPageNumber);
        setTimeout(() => {
          // this.loadscript();
        });
      });
    }
  }
  change(value){
    this.currentPageNumber=Number(value);
    combineLatest([
      this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber),
    ]).subscribe(res => {
      this.list = res[0];
      // console.log(this.list);
      setTimeout(() => {
        // this.loadscript();
      });
    });
  }
  staticRecordcount(){
    return this.listPage;
  }
  getListCate(){
    return this.list;
  }
  currentPage(){
    return this.currentPageNumber;
  }
  onDelete(maTuiXach){
    var user=JSON.parse(localStorage.getItem('accessToken'));
    if(user){
      var bool;
       if(user.role=='admin'){
         bool=true;
       }
       if(bool!=true){
         setTimeout(()=>{
          this.router.navigate(['/Unauthorize']);
         },1000);
         return false;
       }
     return bool;
    }
    else{
       alert("Đăng nhập trước khi tiếp tục");
       this.router.navigate(['/Login']);
       return false;
    }
    combineLatest([
      this._api.post("/api/TuiXach/Xoa-San-Pham-Tui-Xach",maTuiXach)
    ]).subscribe(res=>{
      this.getList(maTuiXach);
      alert("Xóa thành công");
    },
    (error)=>{
      alert("Thao tác thất bại");
      console.log(maTuiXach);
    })
  }
  getList(id){
    combineLatest([
      // this._api.get("/api/TuiXach/Loai-Tui-page/1"),
      this._api.get("/api/TuiXach/Get-Row-total-tui-records"),
      this._api.get("/api/TuiXach/Tui-page/1")
    ]).subscribe(res=>{
      // this.list=res[0];
      this.listPage=res[0];
      console.log(this.list);
      this.list=res[1];
      this.currentPageNumber=1;
    });
    this.list=this.list.filter(res=>{
      return res.maLoaiTuiXach!=id;
    })
  }
}
