import { Component, Injector, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
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
  static listCate=null;
  static currentPageNumber=1;
  static pageList=null;
  ngOnInit(): void {
    combineLatest([
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page-count")
    ]).subscribe(res=>{
      CategoryComponent.listCate=res[0];
      CategoryComponent.pageList=res[1];
      console.log(CategoryComponent.listCate);
    },err=>{
      this.loadscript();
    })
  }
  next(){
    // debugger;
      if(CategoryComponent.listCate != null || CategoryComponent.listCate.length > 0){
        if(CategoryComponent.currentPageNumber < CategoryComponent.pageList.length && CategoryComponent.currentPageNumber>=1){
          CategoryComponent.currentPageNumber+=1;
          // if(this.currentPageNumber >= CategoryComponent.listCate.length){
          //   this.currentPageNumber = CategoryComponent.listCate.length;
          // }

        }
        combineLatest([
          this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ CategoryComponent.currentPageNumber)
        ]).subscribe(res=>{
          CategoryComponent.listCate = res[0];
            console.log(CategoryComponent.pageList);
            console.log(CategoryComponent.currentPageNumber);
            setTimeout(() => {
              // this.loadscript();
            });
          });
      }

  }
  previous(){
    if((CategoryComponent.listCate != null)){
      if(CategoryComponent.currentPageNumber <= CategoryComponent.pageList.length && CategoryComponent.currentPageNumber>1){
        CategoryComponent.currentPageNumber-=1;
        if(CategoryComponent.currentPageNumber<1) CategoryComponent.currentPageNumber=1;

      }
      combineLatest([
        this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ CategoryComponent.currentPageNumber),
      ]).subscribe(res => {
        CategoryComponent.listCate = res[0];
        console.log(CategoryComponent.listCate);
        console.log(CategoryComponent.currentPageNumber);
        setTimeout(() => {
          // this.loadscript();
        });
      });
    }
  }
  change(value){
    CategoryComponent.currentPageNumber=Number(value);
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/Loai-Tui-page/'+ CategoryComponent.currentPageNumber),
    ]).subscribe(res => {
      CategoryComponent.listCate = res[0];
      // console.log(this.list);
      setTimeout(() => {
        // this.loadscript();
      });
    });
  }
  staticRecordcount(){
    return CategoryComponent.pageList;
  }
  getListCate(){
    return CategoryComponent.listCate;
  }
  currentPage(){
    return CategoryComponent.currentPageNumber;
  }
  getList(id){
    combineLatest([
      // this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page-count"),
      this._api.get("/api/LoaiTuiXaches/Loai-Tui-page/1")
    ]).subscribe(res=>{
      // CategoryComponent.listCate=res[0];
      CategoryComponent.pageList=res[0];
      console.log(CategoryComponent.listCate);
      CategoryComponent.listCate=res[1];
      CategoryComponent.currentPageNumber=1;
    });
    CategoryComponent.listCate=CategoryComponent.listCate.filter(res=>{
      return res.maLoaiTuiXach!=id;
    })
  }
  onDelete(maLoaiTuiXach){
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
}
