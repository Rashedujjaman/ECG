import { Component, OnInit } from '@angular/core';
import { faEye, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  //styleUrls: ['./about.component.css'],
})

export class AboutComponent implements OnInit {

  //images
  bannerUrl: string = 'assets/images/banner03.jpg';
  companyProfileImage: string = 'assets/images/factory-image.png';
  retreadingImage: string = 'assets/images/tyre.png';

  //icons
  faEye = faEye;
  faBullseye = faBullseye;

  constructor() { }

  ngOnInit(): void {
  }

}
