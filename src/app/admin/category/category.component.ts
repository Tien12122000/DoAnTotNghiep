import { Component, Injector, OnInit } from '@angular/core';
import { combineLatest, throwError } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent implements OnInit {

  constructor(private inject: Injector, private router:Router) {
    super(inject);
  }
  listCate:any;
  currentPageNumber=1;
  pageList:any;
  formG:any;

  state=1;
  // listPage:any;
  value:any;
  ngOnInit(): void {
    this.formG= new FormGroup({
      Seacrh:new FormControl('',Validators.maxLength(100))
    });
    combineLatest([
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page-count")
    ]).subscribe(res=>{
      this.listCate=res[0];
      this.pageList=res[1];
      console.log(this.listCate);
    },err=>{
      this.loadscript();
    })
  }


  next(){
    if((this.state==2)){
      if(this.currentPageNumber<this.pageList.length ){
        this.currentPageNumber+=1;
      }
      combineLatest([
        this._api.get('/api/LoaiTuiXaches/Search-Loai-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
      ]).subscribe(res => {
        this.listCate = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
    }
    else if(this.state == 1)
    {
      if(this.currentPageNumber<this.pageList.length){
        this.currentPageNumber+=1;
      }
      combineLatest([
        this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ this.currentPageNumber),
      ]).subscribe(res => {
        this.listCate = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
  }
}
previous(){
  if((this.state==2)){
    if(this.currentPageNumber<=this.pageList.length && this.currentPageNumber>1){
      this.currentPageNumber-=1;
    }
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/Search-Loai-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
    ]).subscribe(res => {
      this.listCate = res[0];
      setTimeout(() => {
        this.loadscript();
      });
    }, err => { throw err; });
  }
  else if(this.state == 1)
  {
    if(this.currentPageNumber<=this.pageList.length && this.currentPageNumber>1){
      this.currentPageNumber--;
      this.currentPage();
    }
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ this.currentPageNumber),
    ]).subscribe(res => {
      this.listCate = res[0];
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
        this._api.get('/api/LoaiTuiXaches/Search-Loai-Tui-Paginate/'+ this.currentPageNumber +'/'+this.value),
      ]).subscribe(res => {
        this.listCate = res[0];
        setTimeout(() => {
          this.loadscript();
        });
      }, err => { throw err; });
  }
  else if(this.state==1){
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ this.currentPageNumber),
    ]).subscribe(res => {
      this.listCate = res[0];
      setTimeout(() => {
        this.loadscript();
      });
    }, err => { throw err; });
  }
}
search(getData){
  this.value=getData.Seacrh;
  console.log(this.value);
  if(this.value)
  {
      this.state=2;
      this.currentPageNumber=1;
      combineLatest([
      this._api.get('/api/LoaiTuiXaches/Search-Loai-Tui-Paginate/1/'+this.value),
      this._api.get('/api/LoaiTuiXaches/Search-Record-count/'+this.value)
      ]).subscribe(res => {
      this.listCate = res[0];
      this.pageList=res[1];
      console.log(this.listCate);
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
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page-count")
    ]).subscribe(res=>{
      this.listCate=res[0];
      this.pageList=res[1];
    }, err=>{
      throwError;
    })
  }
}
  staticRecordcount(){
    return this.pageList;
  }
  getListCate(){
    return this.listCate;
  }
  currentPage(){
    return this.currentPageNumber;
  }
  getList(id){
    combineLatest([
      // this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page-count"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1")
    ]).subscribe(res=>{
      // CategoryComponent.listCate=res[0];
      this.pageList=res[0];
      console.log(this.listCate);
      this.listCate=res[1];
      this.currentPageNumber=1;
    });
    this.listCate=this.listCate.filter(res=>{
      return res.maLoaiTuiXach!=id;
    })
  }
  onDelete(maLoaiTuiXach){
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
      this._api.post("/api/LoaiTuiXaches/delLoaiTuixach",maLoaiTuiXach)
    ]).subscribe(res=>{
      this.getList(maLoaiTuiXach);
      alert("Xóa thành công");
    },
    (error)=>{
      alert("Thao tác thất bại");
      console.log(maLoaiTuiXach);
    })
  }
  ShowNumrecialOrder(stt){
    return ++stt;
  }
}
