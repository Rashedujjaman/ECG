import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolidTyreComfortComponent } from './components/dashboard/solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from './components/dashboard/solid-tyre-smart/solid-tyre-smart.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './components/about/about.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { QualityAssuranceComponent } from './components/quality-assurance/quality-assurance.component';
import { ContactComponent } from './components/contact/contact.component';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SolidTyreComfortComponent,
    SolidTyreSmartComponent,
    TableComponent, AboutComponent,
    MilestoneComponent, ContactComponent,
    SettingComponent, QualityAssuranceComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FontAwesomeModule,
    RouterOutlet, RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
