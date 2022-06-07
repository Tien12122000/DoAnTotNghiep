import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent extends BaseComponent implements OnInit {

  constructor(private inject: Injector, private router:Router) {
    super(inject);
  }
  listBill:any;
  listPage:any;
  currentPageNumber=1;;
  ngOnInit(): void {
    let list=this._api.get("/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/1").toPromise();
    // console.log(list);
    list.then((data)=>{
      this.listBill = data;
      // console.log(this.listBill);
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });


    let listRecord=this._api.get("/api/DonHangControllerr/Get-Row-total-don-hang-records").toPromise();
    // console.log(list);
    listRecord.then((data)=>{
      this.listPage = data;
      console.log(JSON.stringify(data));
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    // console.log(this.listBill);
  }

  next(){
    // debugger;
      if((this.listPage != null && this.listPage!="") || this.listPage.length > 0){
        if(this.currentPageNumber < this.listPage.length && this.currentPageNumber>=1){
          this.currentPageNumber+=1;
          if(this.currentPageNumber >= this.listPage.length){
            this.currentPageNumber = this.listPage.length;
          }

        }

        combineLatest([
          this._api.get('/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber)
        ]).subscribe(res=>{
          this.listBill = res[0];
            // console.log(this.listPage);
            // console.log(this.currentPageNumber);
            setTimeout(() => {
              // this.loadscript();
            });
          });
      }

  }
  previous(){
    if((this.listPage != null)){
      if(this.currentPageNumber <= this.listPage.length && this.currentPageNumber>1){
        this.currentPageNumber-=1;
        if(this.currentPageNumber<1) this.currentPageNumber=1;

      }
      combineLatest([
        this._api.get('/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber),
      ]).subscribe(res => {
        this.listBill = res[0];
        setTimeout(() => {
          // this.loadscript();
        });
      });
    }
  }
  change(value){
    this.currentPageNumber=Number(value);
    combineLatest([
      this._api.get('/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber),
    ]).subscribe(res => {
      this.listBill = res[0];
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
    return this.listBill;
  }
  currentPage(){
    return this.currentPageNumber;
  }
  onDelete(id){
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
      this._api.get("/api/DonHangControllerr/Del-Don-Hang/"+ id)
    ]).subscribe(res=>{
      this.getList(id);
      alert("Xóa thành công");
    },
    (error)=>{
      alert("Thao tác thất bại");
      // console.log(maDonHangControllerr);
    })
  }
  getList(id){
    combineLatest([
      this._api.get("/api/DonHangControllerr/Get-Row-total-don-hang-records"),
      this._api.get("/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/1")
    ]).subscribe(res=>{
      this.listPage=res[0];
      this.listBill=res[1];
      this.currentPageNumber=1;
    });
    this.listBill=this.listBill.filter(res=>{
      return res.maLoaiDonHangControllerr!=id;
    })
  }

  // onchange(event){
  //   alert(event.value);
  // }
  // id:any;
  // status:any;
  onUpdate(id,status){
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
      this._api.get("/api/DonHangControllerr/cap-nhat-don-hang/"+id+"/"+status)
    ]).subscribe(res=>{
      alert("Cập nhật thành công");
    },err=>{
      alert("Thao tác thất bại");
    });
    alert(id);
    alert(status);
  }
  pdfExport(id){
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
      this._api.get("/api/BillToPDF/PDF-Export/"+id)
    ]).subscribe(res=>{
      alert("GenPdf");
    }, err=>{
      alert("Error");
    })
  }
}
