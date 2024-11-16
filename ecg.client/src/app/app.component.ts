import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecg.client';

  ngOnInit(): void {
    this.initMouseTrailEffect();
  }

  private initMouseTrailEffect(): void {
    const mouseTrail = document.getElementById('mouse-trail');

    document.addEventListener('mousemove', (event: MouseEvent) => {
      const circle = document.createElement('div');
      circle.classList.add('trail-circle');

      // Set the position of the circle to follow the mouse
      circle.style.left = `${event.pageX - 7.5}px`;
      circle.style.top = `${event.pageY - 7.5}px`;

      // Append the circle to the mouse trail container
      mouseTrail?.appendChild(circle);

      // Remove the circle after the animation ends
      setTimeout(() => {
        mouseTrail?.removeChild(circle);
      }, 2000);
    });
  }
}
