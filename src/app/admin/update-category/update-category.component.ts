import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, throwError } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent extends BaseComponent implements OnInit, AfterViewInit {

  trueFalse=false;
  Message="";
  formGroup:FormGroup;
  constructor(private inject: Injector, private route: Router, private activeRoute:ActivatedRoute) {
    super(inject);
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  // public Editor = ClassicEditor;
  result="";
  LoaiSp:any;
  ngOnInit(): void {
    this.formGroup= new FormGroup({
      TenLoaiTui:new FormControl('',Validators.required),
      // Motaloai:new FormControl('',Validators.required)
    });
    this.activeRoute.paramMap.subscribe(params => {
      console.log(params);
      this.id =params.get("id");
    });
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/danhsach'),
      this._api.get('/api/LoaiTuiXaches/GetLoaiTuiByID/'+this.id)
    ]).subscribe(res=>{
        this.LoaiSp=res[1];
        this.formGroup.controls['TenLoaiTui'].setValue(this.LoaiSp['tenLoai']);
        // this.form.controls['Giasanpham'].setValue(this.LoaiSp['gia']);
        // this.form.controls['TenLoai'].setValue(this.LoaiSp['maLoaiTuiXach']);
        console.log(this.LoaiSp);
    });
  }

  private id;
  updateBagType(formGroup, editor){
    this.result=editor.data;
    alert(this.result);
    alert("ok: "+formGroup.controls.TenLoaiTui.value);
    let tenloai=formGroup.controls.TenLoaiTui.value;
    let bag={};
    var loai={
      maLoaiTuiXach:this.id,
      tenLoai: tenloai,
      moTa: this.result
    }
    combineLatest([
      this._api.get("/api/LoaiTuiXaches/GetLoaiTuiByID/"+this.id)
    ]).subscribe(res=>{
      bag=res[0];
      console.log(bag);
      if(tenloai=="" || tenloai==null || tenloai.length==0||tenloai==undefined ||tenloai=='undefined' ){
        tenloai=bag['tenLoai'];
        alert(tenloai);
      }
      if(this.result==null || this.result==""||this.result.length==0|| this.result=="<p></p>"||this.result==undefined||this.result=='undefined')
        this.result=bag['moTa'];
      // debugger;
      loai.maLoaiTuiXach=this.id;
      loai.tenLoai=tenloai;
      loai.moTa= this.result;
      console.log(loai);
      this._api.post("/api/LoaiTuiXaches/update-loai",loai).subscribe(res=>{
      console.log(res);
      this.trueFalse=true;
      this.Message="Cập nhật thành công";
        },
        (error)=>{
          this.Message="Thao tác thất bại";
        }
        );
      },
      error=>{return error;}
    );
  }
}
