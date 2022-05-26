import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-bill-to-pdf',
  templateUrl: './bill-to-pdf.component.html',
  styleUrls: ['./bill-to-pdf.component.css'],
})
export class BillToPDFComponent extends BaseComponent implements OnInit {

  constructor(private inject: Injector, private router: ActivatedRoute) {
    super(inject);
   }
  bill:any;
  billId:any;
  listBillDetail:any;
  ngOnInit(): void {
    this.router.paramMap.subscribe(res=>{
      this.billId=res.get("id");
      console.log(this.billId);
    });
    let bill=this._api.get("/api/DonHangControllerr/GetDonHangById/"+this.billId).toPromise();
    bill.then(data=>{
      this.bill=data;
      console.log(this.bill);
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    let billDetail=this._api.get("/api/ChiTietDonHang/GetAllBillDetailById/" + this.billId).toPromise();
    billDetail.then(data=>{
      this.listBillDetail=data;
      console.log(this.listBillDetail);
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    combineLatest([
      this._api.get("/api/BillToPDF/PDF-Export/"+this.billId)
    ]).subscribe(res=>{
      alert("GenPdf");
    })
  }

}
