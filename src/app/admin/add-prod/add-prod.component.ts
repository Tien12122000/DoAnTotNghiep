import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector, private http: HttpClient) {
    super(injector);
   }

  form:FormGroup;
  listcate:any;
  file:any;
  ngOnInit(): void {
    this.form=new FormGroup({
      Tensanpham: new FormControl('',[Validators.required]),
      Giasanpham: new FormControl('',[Validators.required]),
      img1: new FormControl('',[Validators.required]),
      TenLoai: new FormControl('',[Validators.required])
    });
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/danhsach')
    ]).subscribe(res=>{
      this.listcate=res[0];
      console.log(this.listcate);
    })
  }

  onSubmit(form, editor){
    // debugger;
    console.log(form.controls.img1.value);
    console.log(form);

    // alert(this.file);
    let file= new FormData();

    file.append('file', this.file, this.file.name);



    combineLatest([
      this.http.post('https://localhost:44399/api/TuiXach/upload',file)
    ]).subscribe(res=>{
      var tuiXach={
        maLoaiTuiXach: form.controls.TenLoai.value,
        tenTuiXach: form.controls.Tensanpham.value,
        gia: form.controls.Giasanpham.value,
        moTa: editor.data,
        hinhAnh: res[0]['filePath']
      };
      combineLatest([
        this._api.post("/api/TuiXach/Them-San-Pham",tuiXach)
      ]).subscribe(response=>{
        alert("Thêm sản phẩm thành công");
      }, error=>{
        alert("Thao tác thất bại");
      });
      console.log(tuiXach);
    },err=>{
      alert("Thao tác thất bại");
      // window.location.reload
    });
  }
  change(event){
    // alert(event.target.files[0]);
    this.file=event.target.files[0];
    console.log(this.file)
  }
}
