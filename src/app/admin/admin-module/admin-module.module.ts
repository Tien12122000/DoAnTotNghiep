import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { CategoryComponent } from '../category/category.component';
import { BillComponent } from '../bill/bill.component';
import { CartComponent } from '../cart/cart.component';
import { DetailComponent } from '../detail/detail.component';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { AddProdComponent } from '../add-prod/add-prod.component';
import { UpdateProdComponent } from '../update-prod/update-prod.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';
import { BillToPDFComponent } from '../bill-to-pdf/bill-to-pdf.component';
import { environment } from 'src/environments/environment';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthorizeService } from 'src/app/core/authorize.service';

@NgModule({
  declarations: [
    CategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DataTableComponent,
    AddProdComponent,
    UpdateProdComponent,
    DetailComponent,
    BillComponent,
    BillDetailComponent,
    BillToPDFComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    CartComponent

  ],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    RouterModule.forChild([
      {path: "",component:DashboardComponent},
      {path: "Datable", component: DataTableComponent},
      {path:"Category",component:CategoryComponent},
      {path:"Bill",component:BillComponent},
      {path:"Cart",component:CartComponent},
      {path:"Cart-Detail",component:CartDetailComponent},
      {path:"Detail/:id",component:DetailComponent},
      {path:"AddProd",component:AddProdComponent,canActivate:[AuthorizeService]},
      {path:"UpdateProd/:id",component:UpdateProdComponent,canActivate:[AuthorizeService]},
      {path:"UpdateCategory/:id",component:UpdateCategoryComponent,canActivate:[AuthorizeService]},
      {path:"AddCategory",component:AddCategoryComponent,canActivate:[AuthorizeService]},
      {path:"Dashboard", component: DashboardComponent},
      {path:"Bill-Detail/:id", component: BillDetailComponent},
      {path:"BillToPDF/:id", component: BillToPDFComponent,canActivate:[AuthorizeService]},
      // {path:"DeleteCategory", component: CategoryComponent,canActivate:[AuthorizeService]}

    ])
  ],

})
export class AdminModuleModule { }
