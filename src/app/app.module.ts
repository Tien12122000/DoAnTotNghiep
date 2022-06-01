import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './admin/login/login.component';
import { environment } from 'src/environments/environment';
import { UnauthorizeComponent } from './admin/unauthorize/unauthorize.component';
// import { BillToPDFComponent } from './admin/bill-to-pdf/bill-to-pdf.component';




const CLIENT_ID = environment.client_Id;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnauthorizeComponent
    // FooterComponent,
    // BillToPDFComponent,
    // BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers:[
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
