import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tyre } from '../../interfaces/tyre';
import { ProductService } from '../../services/product.service';
import { SnackBarService } from '../../services/snackbar.service';


@Component({
  selector: 'solid-tyre-rib',
  template: `<app-table
               [groupedData]="groupedData"
               [title1]="title1"
               [title2]="title2"
               [imageUrl]="imageUrl"
               [isSettingPage]="isSettingPage"
               (editItem)="onEdit($event)"
               (deleteItem)="onDelete($event)">
            </app-table>`,
})

export class SolidTyreRibComponent implements OnInit {

  @Input() isSettingPage?: boolean = false;

  @Output() editItem = new EventEmitter<any>();

  public solidTyreRib: Tyre[] = [];
  public groupedData: any[] = [];

  title1: string = 'Solid Tyres';
  title2: string = 'Rib';
  imageUrl: string = 'assets/images/solid-tyre-rib.png';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private SnackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.getSolidTyreRib();
  }

  getSolidTyreRib() {
    this.productService.getSolidTyreRib().subscribe(
      (result) => {
        this.solidTyreRib = result;
        this.groupDataByCategory();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  groupDataByCategory() {
    const grouped = this.solidTyreRib.reduce((acc, item) => {
      const category = item.category ?? '';
      if (!acc[category]) {
        acc[category] = { category, items: [] };
      }
      acc[category].items.push(item);
      return acc;
    }, {} as Record<string | number, { category: string | number; items: Tyre[] }>);

    this.groupedData = Object.values(grouped);
  }

  // Add a single tyre to the table
  addNewTyre(newTyre: Tyre) {
    this.solidTyreRib.push(newTyre);
    this.groupDataByCategory();
  }

  // Update an existing tyre in the table
  updateExistingTyre(updatedTyre: Tyre) {
    const index = this.solidTyreRib.findIndex((tyre) => tyre.id === updatedTyre.id);
    if (index !== -1) {
      // Update the existing tyre
      this.solidTyreRib[index] = updatedTyre;
      // Refresh grouped data
      this.groupDataByCategory();
    }
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  onDelete(item: any) {
    if (confirm(`Are you sure you want to delete ${item.size}?`)) {
      this.productService.deleteSolidTyreRib(item.id).subscribe({
        next: () => {
          this.SnackBarService.success('Product deleted successfully!', null, 2000);
          this.solidTyreRib = this.solidTyreRib.filter(tyre => tyre.id !== item.id);
          this.groupDataByCategory()
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.SnackBarService.error('An error occured deleting product.', null, 3000);
        }
      });
    }
  }
}
