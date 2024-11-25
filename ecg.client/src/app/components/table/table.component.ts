import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})


export class TableComponent implements OnInit {
  @Input() groupedData: any[] = [];
  @Input() title1: string = '';
  @Input() title2: string = '';
  @Input() imageUrl: string = '';

  @Input() isSettingPage?: boolean = false;

  // Events for parent interaction
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  //isSettingPage: boolean = false;

  // Icon
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEditProduct(item: any): void {
    // Emit the event to the parent with the item to edit
    this.editItem.emit(item);
  }

  onDeleteProduct(item: any): void {
    // Emit the event to the parent with the item to delete
    this.deleteItem.emit(item);
  }
}
