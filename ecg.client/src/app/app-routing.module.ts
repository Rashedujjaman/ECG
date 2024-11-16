import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ContactComponent } from './contact/contact.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard'
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
