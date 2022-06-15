import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import * as $ from 'jquery';

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
      setTimeout(() => {

        this.RemoveOption();
      }, 1000);
      // console.log(this.listBill);
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });


    let listRecord=this._api.get("/api/DonHangControllerr/Get-Row-total-don-hang-records").toPromise();
    // console.log(list);
    listRecord.then((data)=>{
      this.listPage = data;
      console.log(JSON.stringify(data));
      setTimeout(() => {

        this.RemoveOption();
      }, 1000);
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

          setTimeout(() => {
            this.RemoveOption();
          }, 500);
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

          this.RemoveOption();
        }, 500);
      });
    }
  }
  change(value){
    this.currentPageNumber=Number(value);
    combineLatest([
      this._api.get('/api/DonHangControllerr/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber),
    ]).subscribe(res => {
      this.listBill = res[0];
      setTimeout(() => {

        this.RemoveOption();
      }, 500);
      // console.log(this.list);
      setTimeout(() => {
        this.listBill = res[0];
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
      // this._api.get("/api/DonHangControllerr/Del-Don-Hang/"+ id)
      this._api.get("/api/DonHangControllerr/cap-nhat-don-hang/"+id+"/Cancled")
    ]).subscribe(res=>{
      this.getList(id);
      $("#"+id).find("select").prop('disabled', true);
      alert("Cập nhật thành công");
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
  RemoveOption(){
    var value=$("select").val();
    $("select").each(function(e){
      if($(this).val().trim().toLocaleLowerCase()=='Receive'.trim().toLocaleLowerCase()){
        $(this).find('option[value="Unfinished"]').remove();
      }
      if($(this).val().trim().toLocaleLowerCase()=='Pack'.trim().toLocaleLowerCase()){
        $(this).find('option[value="Unfinished"]').remove();
        $(this).find('option[value="Receive"]').remove();
      }
      if($(this).val().trim().toLocaleLowerCase()=='Delivering'.trim().toLocaleLowerCase()){
        $(this).find('option[value="Unfinished"]').remove();
        $(this).find('option[value="Receive"]').remove();
        $(this).find('option[value="Pack"]').remove();
      }
      if($(this).val().trim().toLocaleLowerCase()=='Delivered'.trim().toLocaleLowerCase()){
        $(this).find('option[value="Unfinished"]').remove();
        $(this).find('option[value="Receive"]').remove();
        $(this).find('option[value="Pack"]').remove();
        $(this).find('option[value="Delivering"]').remove();
      }
      if($(this).val().trim().toLocaleLowerCase()=='Cancled'.trim().toLocaleLowerCase()){
        $(this).find('option[value="Unfinished"]').remove();
        $(this).find('option[value="Receive"]').remove();
        $(this).find('option[value="Pack"]').remove();
        $(this).find('option[value="Delivering"]').remove();
        $(this).find('option[value="Delivered"]').remove();
      }
    })
  }
  onUpdate(id){
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
    {
      var value=$("#"+id).find("select").val();
      combineLatest([
        this._api.get("/api/DonHangControllerr/cap-nhat-don-hang/" + id + "/"+ value)
      ]).subscribe(res=>{
        this.RemoveOption();
        alert("Cập nhật thành công");
      },err=>{
        alert("Thao tác thất bại");
      });
    }
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
