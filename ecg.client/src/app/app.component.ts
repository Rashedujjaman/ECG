import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecg.client';

  bannerUrl: string = 'assets/images/banner01.png';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  protected logoutRoot(): boolean {
    if (this.router.url === '/') {
      return true;
    }
    else {
      return false;
    }
  }

  protected contactRoot(): boolean {
    if (this.router.url === '/contact') {
      return true;
    }
    else {
      return false;
    }
  }

  //private initMouseTrailEffect(): void {
  //  const mouseTrail = document.getElementById('mouse-trail');

  //  document.addEventListener('mousemove', (event: MouseEvent) => {
  //    const circle = document.createElement('div');
  //    circle.classList.add('trail-circle');

  //    // Set the position of the circle to follow the mouse
  //    circle.style.left = `${event.pageX - 7.5}px`;
  //    circle.style.top = `${event.pageY - 7.5}px`;

  //    // Append the circle to the mouse trail container
  //    mouseTrail?.appendChild(circle);

  //    // Remove the circle after the animation ends
  //    setTimeout(() => {
  //      mouseTrail?.removeChild(circle);
  //    }, 2000);
  //  });
  //}
}
