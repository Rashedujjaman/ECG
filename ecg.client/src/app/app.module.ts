import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolidTyreComfortComponent } from './components/solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from './components/solid-tyre-smart/solid-tyre-smart.component';
import { SolidTyreRibComponent } from './components/solid-tyre-rib/solid-tyre-rib.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { CompoundComponent } from './components/compound/compound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './components/about/about.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { QualityAssuranceComponent } from './components/quality-assurance/quality-assurance.component';
import { ContactComponent } from './components/contact/contact.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProductManagerComponent } from './components/setting/product-manager/product-manager.component';
import { MilestoneManagerComponent } from './components/setting/milestone-manager/milestone-manager.component';
import { CompoundManagerComponent } from './components/setting/compound-manager/compound-manager.component';
import { AccountManagerComponent } from './components/setting/account-manager/account-manager.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    ProductComponent,
    SolidTyreComfortComponent,
    SolidTyreSmartComponent,
    SolidTyreRibComponent,
    TableComponent, AboutComponent,
    MilestoneComponent, ContactComponent,
    QualityAssuranceComponent, CompoundComponent,

    LoginComponent,

    SettingComponent,
    ProductManagerComponent, MilestoneManagerComponent,
    CompoundManagerComponent, AccountManagerComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FontAwesomeModule,
    RouterOutlet, RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
