import { Component, OnInit } from '@angular/core';

//import { faEye, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quality-assurance',
  templateUrl: './quality-assurance.component.html',
})

export class QualityAssuranceComponent implements OnInit {

  //images
  bannerUrl: string = 'assets/images/banner04.png';
  qualityImageUrl: string = 'assets/images/quality.jpg';
  //retreadingImage: string = 'assets/images/tyre.png';

  //icons
  //faEye = faEye;
  //faBullseye = faBullseye;

  constructor() { }

  ngOnInit(): void {
  }

}
