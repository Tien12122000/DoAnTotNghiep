import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-update-prod',
  templateUrl: './update-prod.component.html',
  styleUrls: ['./update-prod.component.css']
})
export class UpdateProdComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private injector:Injector, private http: HttpClient, private router:ActivatedRoute) {
    super(injector);
   }
  form:FormGroup;
  listcate:any;
  file:any;
  id;
  tui:any;
  ngOnInit(): void {
    this.form=new FormGroup({
      Tensanpham: new FormControl('',[Validators.required]),
      Giasanpham: new FormControl('',[Validators.required]),
      img1: new FormControl('',[Validators.required]),
      TenLoai: new FormControl('',[Validators.required])
    });
    this.router.paramMap.subscribe(params => {
      console.log(params);
      this.id =params.get("id");
    });
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/danhsach'),
      this._api.get('/api/TuiXach/Get-Tui-by-ID/'+this.id)
    ]).subscribe(res=>{
      this.listcate=res[0];
        this.tui=res[1];
        this.form.controls['Tensanpham'].setValue(this.tui['tenTuiXach']);
        this.form.controls['Giasanpham'].setValue(this.tui['gia']);
        this.form.controls['TenLoai'].setValue(this.tui['maLoaiTuiXach']);
        console.log(this.tui);
    });

  }
  ngAfterViewInit(): void {
    // this.loadscript();
  }
  onSubmit(form, editor){
    // debugger;
    if(this.file) {
      console.log(form.controls.img1.value);
      console.log(form);
      alert("Ok");

      alert(this.file);
      let file= new FormData();

      file.append('file', this.file, this.file.name);
      combineLatest([
        this.http.post('https://localhost:44399/api/TuiXach/upload',file)
      ]).subscribe(res=>{
      var tuiXach={
        maTuiXach: this.id,
        maLoaiTuiXach: form.controls.TenLoai.value,
        tenTuiXach: form.controls.Tensanpham.value,
        gia: form.controls.Giasanpham.value,
        moTa: editor.data,
        hinhAnh: res[0]['filePath']
        };
        if(tuiXach.maLoaiTuiXach==null || tuiXach.maLoaiTuiXach=="") tuiXach.maLoaiTuiXach=this.tui['maLoaiTuiXach'];
        if(tuiXach.tenTuiXach==null || tuiXach.tenTuiXach=="") tuiXach.tenTuiXach=this.tui['tenTuiXach'];
        if(tuiXach.gia==null || tuiXach.gia=="") tuiXach.gia=this.tui['gia'];
        if(tuiXach.moTa==null || tuiXach.moTa=="") tuiXach.moTa=this.tui['moTa'];
        combineLatest([
          this._api.post("/api/TuiXach/Sua-San-Pham-Tui-Xach",tuiXach)
        ]).subscribe(response=>{
          alert("Thành công");
        }, error=>{
          alert("Thao tác thất bại");
        });
        console.log(tuiXach);
      },err=>{
      alert("Thao tác thất bại");
      // window.location.reload
      });
    }

    else{
      alert("null");
        var tuiXach={
        maTuiXach: this.id,
        maLoaiTuiXach: form.controls.TenLoai.value,
        tenTuiXach: form.controls.Tensanpham.value,
        gia: form.controls.Giasanpham.value,
        moTa: editor.data,
        hinhAnh: this.tui['hinhAnh']
        };
        if(tuiXach.maLoaiTuiXach==null || tuiXach.maLoaiTuiXach=="") tuiXach.maLoaiTuiXach=this.tui['maLoaiTuiXach'];
        if(tuiXach.tenTuiXach==null || tuiXach.tenTuiXach=="") tuiXach.tenTuiXach=this.tui['tenTuiXach'];
        if(tuiXach.gia==null || tuiXach.gia=="") tuiXach.gia=this.tui['gia'];
        if(tuiXach.moTa==null || tuiXach.moTa=="") tuiXach.moTa=this.tui['moTa'];
        combineLatest([
          this._api.post("/api/TuiXach/Sua-San-Pham-Tui-Xach",tuiXach)
        ]).subscribe(response=>{
          alert("Thành công");
        }, error=>{
          alert("Thao tác thất bại");
        });
    }

  }
  change(event){
    alert(event.target.files[0]);
    this.file=event.target.files[0];
    console.log(this.file)
  }
}
