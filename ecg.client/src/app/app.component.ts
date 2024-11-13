import { Component } from '@angular/core';
import { SolidTyreComfortComponent } from './solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from './solid-tyre-smart/solid-tyre-smart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecg.client';
}
