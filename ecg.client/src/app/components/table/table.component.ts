import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})

export class TableComponent {
  @Input() groupedData: any[] = [];
  @Input() title1: string = '';
  @Input() title2: string = '';
  @Input() imageUrl: string = '';

  title = 'table';
}
