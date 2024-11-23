import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { AboutComponent } from './components/about/about.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { ContactComponent } from './components/contact/contact.component';
import { QualityAssuranceComponent } from './components/quality-assurance/quality-assurance.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'Products'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us'
  },
  {
    path: 'milestone',
    component: MilestoneComponent,
    title: 'Milestones'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us'
  },
  {
    path: 'qa',
    component: QualityAssuranceComponent,
    title: 'Quality Assurance'
  },
  {
    path: 'setting',
    component: SettingComponent,
    title: 'Setting'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
