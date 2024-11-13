import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})

export class TableComponent {
  @Input() groupedData: any[] = [];
  title = 'table';
}
