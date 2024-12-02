import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tyre } from '../../interfaces/tyre';
import { ProductService } from '../../services/product.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'solid-tyre-comfort',
  templateUrl: './solid-tyre-comfort.component.html',
  styleUrl: './solid-tyre-comfort.component.css'
})

export class SolidTyreComfortComponent implements OnInit {

  @Input() isSettingPage?: boolean = false;

  @Output() editItem = new EventEmitter<any>();

  public solidTyreComfort: Tyre[] = [];
  public groupedData: any[] = [];

  product: string = 'stc';

  //table data
  title1: string = 'Solid Tyres';
  title2: string = 'Comfort';
  imageUrl: string = 'assets/images/solid-tyre-comfort.png';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private SnackBarService: SnackBarService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.getSolidTyreComfort();
  }


  getSolidTyreComfort() {

    this.productService.getSolidTyreComfort().subscribe(
      (result) => {
        this.solidTyreComfort = result;
        this.groupDataByCategory();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  groupDataByCategory() {
    const grouped = this.solidTyreComfort.reduce((acc, item) => {
      const category = item.category ?? '';
      if (!acc[category]) {
        acc[category] = { category, items: [] };
      }
      acc[category].items.push(item);
      return acc;
    }, {} as Record<string | number, { category: string | number; items: Tyre[] }>);

    // Sort the items within each category
    Object.values(grouped).forEach(group => {
      group.items.sort((a, b) => {
        // Sort by category first
        if (a.category !== b.category) {
          return a.category.toString().localeCompare(b.category.toString());
        }

        // Sort by size next
        if (a.size !== b.size) {
          return a.size.localeCompare(b.size);
        }

        // Sort by rimsize, extracting the numeric part for comparison
        const aRimSize = parseInt(a.rimsize.split(' ')[0]);
        const bRimSize = parseInt(b.rimsize.split(' ')[0]);
        return aRimSize - bRimSize;
      });
    });

    this.groupedData = Object.values(grouped);
  }

  //groupDataByCategory() {
  //  const grouped = this.solidTyreComfort.reduce((acc, item) => {
  //    const category = item.category ?? '';
  //    if (!acc[category]) {
  //      acc[category] = { category, items: [] };
  //    }
  //    acc[category].items.push(item);
  //    return acc;
  //  }, {} as Record<string | number, { category: string | number; items: Tyre[] }>);

  //  this.groupedData = Object.values(grouped);
  //}

  // Add a single tyre to the table
  addNewTyre(newTyre: Tyre) {
    this.solidTyreComfort.push(newTyre);
    this.groupDataByCategory();
  }

  // Update an existing tyre in the table
  updateExistingTyre(updatedTyre: Tyre) {
    const index = this.solidTyreComfort.findIndex((tyre) => tyre.id === updatedTyre.id);
    if (index !== -1) {
      // Update the existing tyre
      this.solidTyreComfort[index] = updatedTyre;
      // Refresh grouped data
      this.groupDataByCategory();
    }
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  protected settingRoute(): boolean {
    if (this.router.url === '/setting') {
      return true;
    }
    else {
      return false;
    }
  }

  onDelete(item: any) {
    if (confirm(`Are you sure you want to delete ${item.size}?`)) {
      this.productService.deleteSolidTyreComfort(item.id).subscribe({
        next: () => {
          this.SnackBarService.success('Product deleted successfully!', null, 2000);
          this.solidTyreComfort = this.solidTyreComfort.filter(tyre => tyre.id !== item.id);
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
