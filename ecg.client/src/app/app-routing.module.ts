import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { AboutComponent } from './components/about/about.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { ContactComponent } from './components/contact/contact.component';
import { QualityAssuranceComponent } from './components/quality-assurance/quality-assurance.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { BlankPageComponent } from './components/blank.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Comfort Green Tyre'
  },
  //{
  //  path: 'dummy',
  //  component: DashboardComponent,
  //  title: 'Dashboard'
  //},
  {
    path: 'product',
    component: ProductComponent,
    title: 'Comfort Green Tyre'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Comfort Green Tyre'
  },
  {
    path: 'milestone',
    component: MilestoneComponent,
    title: 'Comfort Green Tyre'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Comfort Green Tyre'
  },
  {
    path: 'qa',
    component: QualityAssuranceComponent,
    title: 'Comfort Green Tyre'
  },
  {
    path: 'setting',
    component: SettingComponent,
    title: 'Comfort Green Tyre',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Comfort Green Tyre'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
