import { Component, OnInit } from '@angular/core';
import { faEye, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  //styleUrls: ['./about.component.css'],
})

export class AboutComponent implements OnInit {

  //images
  bannerUrl: string = 'assets/images/banner04.png';
  //companyProfileImage: string = 'assets/images/factory-image.png';
  //retreadingImage: string = 'assets/images/tyre.png';
  certificationImage: string = 'assets/images/certification_image.webp';
  featureImage: string = 'assets/images/tyre.png';

  //icons
  faEye = faEye;
  faBullseye = faBullseye;

  constructor() { }

  ngOnInit(): void {
  }

}
