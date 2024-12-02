import { Component, OnInit } from '@angular/core';
import { faHome, faPhone, faMailBulk, faMobile, faFax, faGlobeAsia, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //Icons
  faHome = faHome;
  faPhone = faPhone;
  faMailBulk = faMailBulk;
  faMobile = faMobile;
  faFax = faFax;
  faGlobe = faGlobeAsia;
  faArrow = faArrowRight;
  constructor() { }

  ngOnInit(): void {

  }

}
