import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, throwError } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import { HeaderComponent } from '../header/header.component';

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
  formG:any;
  ngOnInit(): void {
    this.formG= new FormGroup({
      Seacrh:new FormControl('',Validators.maxLength(100))
    });
    combineLatest([
      this._api.get("/api/TuiXach/Tui-page/1"),
      this._api.get("/api/TuiXach/Get-Row-total-tui-records"),
    ]).subscribe(res=>{
      this.list=res[0];
      this.listPage=res[1];
    }, err=>{
      throwError;
    })
  }
  ngAfterViewInit(): void {
    this.loadscript();
  }

  state=1;
  next(){
      if((this.state==2)){
        if(this.currentPageNumber<this.listPage.length ){
          this.currentPageNumber+=1;
        }
        combineLatest([
          this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
        ]).subscribe(res => {
          this.list = res[0];
          setTimeout(() => {
            this.loadscript();
          });
        }, err => { throw err; });
      }
      else if(this.state == 1)
      {
        if(this.currentPageNumber<this.listPage.length){
          this.currentPageNumber+=1;
        }
        combineLatest([
          this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber),
        ]).subscribe(res => {
          this.list = res[0];
          setTimeout(() => {
            this.loadscript();
          });
        }, err => { throw err; });
    }
  }
  previous(){
    if((this.state==2)){
      if(this.currentPageNumber>=this.listPage.length && this.currentPageNumber>1){
        this.currentPageNumber-=1;
      }
      combineLatest([
        this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
      ]).subscribe(res => {
        this.list = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
    }
    else if(this.state == 1)
    {
      if(this.currentPageNumber>=this.listPage.length && this.currentPageNumber>1){
        this.currentPageNumber--;
        this.currentPage();
      }
      combineLatest([
        this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber),
      ]).subscribe(res => {
        this.list = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
  }
  }
  change(value){
    this.currentPageNumber=Number(value);
    this.currentPage();
    if(this.state==2){

        combineLatest([
          this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
        ]).subscribe(res => {
          this.list = res[0];
          setTimeout(() => {
            this.loadscript();
          });
        }, err => { throw err; });
    }
    else if(this.state==1){
      combineLatest([
        this._api.get('/api/TuiXach/Tui-page/'+ this.currentPageNumber),
      ]).subscribe(res => {
        this.list = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
    }
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
      var bool=false;
       if(user.role=='admin'){
         bool=true;
       }
       if(bool!=true){
         setTimeout(()=>{
          this.router.navigate(['/Unauthorize']);
          bool=false;
         },1000);
       }
    }
    if(bool==true)
    combineLatest([
      this._api.post("/api/TuiXach/Xoa-San-Pham-Tui-Xach",maTuiXach)
    ]).subscribe(res=>{
      this.getList(maTuiXach);
      alert("Xóa thành công");
    },
    (error)=>{
      alert("Thao tác thất bại");
    })
  }
  getList(id){
    combineLatest([
      this._api.get("/api/TuiXach/Get-Row-total-tui-records"),
      this._api.get("/api/TuiXach/Tui-page/1")
    ]).subscribe(res=>{
      this.listPage=res[0];
      this.list=res[1];
      this.currentPageNumber=1;
    });
    this.list=this.list.filter(res=>{
      return res.maLoaiTuiXach!=id;
    })
  }
  ShowNumrecialOrder(stt){
    return ++stt;
  }


  value:any;
  search(getData){
    this.value=getData.Seacrh;
    console.log(this.value);
    if(this.value)
    {
        this.state=2;
        this.currentPageNumber=1;
        combineLatest([
        this._api.get('/api/TuiXach/Search-Tui-Paginate/1/'+this.value),
        this._api.get('/api/TuiXach/Search-Record-count/'+this.value)
        ]).subscribe(res => {
        this.list = res[0];
        this.listPage=res[1];
        console.log(this.list);
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
      this.formG= new FormGroup({
        Seacrh:new FormControl('',Validators.maxLength(100))
      });
    }
    else{
      this.state=1;
      this.currentPageNumber=1;
      combineLatest([
        this._api.get("/api/TuiXach/Tui-page/1"),
        this._api.get("/api/TuiXach/Get-Row-total-tui-records"),
      ]).subscribe(res=>{
        this.list=res[0];
        this.listPage=res[1];
      }, err=>{
        throwError;
      })
    }
  }
}
