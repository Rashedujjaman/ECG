import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolidTyreComfortComponent } from './solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from './solid-tyre-smart/solid-tyre-smart.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './about/about.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    SolidTyreComfortComponent,
    SolidTyreSmartComponent,
    TableComponent, AboutComponent,
    MilestoneComponent, 
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FontAwesomeModule, RouterOutlet, RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
