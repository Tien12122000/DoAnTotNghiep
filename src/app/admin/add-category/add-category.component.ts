import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent extends BaseComponent implements OnInit {

  trueFalse=false;
  Message="";
  formGroup:FormGroup;
  constructor(private inject: Injector, private route: Router) {
    super(inject);
  }
  // public Editor = ClassicEditor;
  result="";
  ngOnInit(): void {
    this.formGroup= new FormGroup({
      TenLoaiTui:new FormControl('',Validators.required),
      Motaloai:new FormControl('',Validators.required)
    })
  }
  addBagType(formGroup, editor){
    this.result=editor.data;
    var bagType={
      tenLoai: formGroup.controls.TenLoaiTui.value,
      moTa: this.result
    }
    console.log(bagType);

    this._api.post("/api/LoaiTuiXaches/AddloaiTui",bagType).subscribe(res=>{
      console.log(res);
      this.trueFalse=true;
      this.Message="Thêm loại túi thành công";
      // alertifyjs("Thêm loại túi thành công");
    },
    (error)=>{
      this.Message="Thêm loại túi thất bại";
    }
    );
  }
}
