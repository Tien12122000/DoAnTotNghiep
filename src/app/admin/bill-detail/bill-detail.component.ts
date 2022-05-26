import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent extends BaseComponent implements OnInit {

  constructor(private router:ActivatedRoute, private inject:Injector) {
    super(inject);
  };

  id:any;
  listBillDetail:any;
  list
  ngOnInit(): void {
    this.loadscript();
    this.router.paramMap.subscribe(params=>{
      this.id=params.get('id');
    });
    console.log(this.id);
    let listDetail=this._api.get("/api/ChiTietDonHang/sp_ChiTietDonHang_Paginate_By_ID/1/"+this.id).toPromise();
    listDetail.then(data=>{
      this.listBillDetail=data;
      console.log(this.listBillDetail);
    });
    let listPages=this._api.get("/api/ChiTietDonHang/get-Chi-Tiet-Don-Hang-Record-count/"+this.id).toPromise();
    listPages.then(data=>{
      this.listPage=data;
    });
  };
  listBill:any;
  listPage:any;
  currentPageNumber=1;
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
          this._api.get('/api/ChiTietDonHang/sp_ChiTietDonHang_Paginate_By_ID/'+ this.currentPageNumber+"/"+this.id)
        ]).subscribe(res=>{
          this.listBill = res[0];
            // console.log(this.listPage);
            // console.log(this.currentPageNumber);
            setTimeout(() => {
              // this.loadscript();
            });
          });
      }

  };
  previous(){
    if((this.listPage != null)){
      if(this.currentPageNumber <= this.listPage.length && this.currentPageNumber>1){
        this.currentPageNumber-=1;
        if(this.currentPageNumber<1) this.currentPageNumber=1;

      }
      combineLatest([
        this._api.get('/api/ChiTietDonHang/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber+"/"+this.id),
      ]).subscribe(res => {
        this.listBill = res[0];
        setTimeout(() => {
          // this.loadscript();
        });
      });
    }
  };
  change(value){
    this.currentPageNumber=Number(value);
    combineLatest([
      this._api.get('/api/ChiTietDonHang/Danh-Sach-Don-Hang-paginate/'+ this.currentPageNumber+"/"+this.id),
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
}
