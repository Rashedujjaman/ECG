import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tyre } from '../../interfaces/tyre';
import { ProductService } from '../../services/product.service';
import { SnackBarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'solid-tyre-smart',
  templateUrl: './solid-tyre-smart.component.html',
  styleUrl: './solid-tyre-smart.component.css'
})

export class SolidTyreSmartComponent implements OnInit {

  @Input() isSettingPage?: boolean = false;

  @Output() editItem = new EventEmitter<any>();

  public solidTyreSmart: Tyre[] = [];
  public groupedData: any[] = [];

  product: string = 'sts';

  title1: string = 'Solid Tyres';
  title2: string = 'Smart';
  imageUrl: string = 'assets/images/solid-tyre-smart.png';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private SnackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSolidTyreSmart();
  }

  protected settingRoute(): boolean {
    if (this.router.url === '/setting') {
      return true;
    }
    else {
      return false;
    }
  }

  getSolidTyreSmart() {
    this.productService.getSolidTyreSmart().subscribe(
      (result) => {
        this.solidTyreSmart = result;
        this.groupDataByCategory();
      },
      (error) => {
        console.error(error);
      }
    );
  }


  groupDataByCategory() {
    const grouped = this.solidTyreSmart.reduce((acc, item) => {
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
        //if (a.size !== b.size) {
        //  return a.size.localeCompare(b.size);
        //}

        // Sort by size next
        if (a.size !== b.size) {
          const sizeToNumber = (size: string): number => {
            const match = size.match(/[\d.]+/g);
            return match ? parseFloat(match[0]) : 0;
          };

          const aSize = sizeToNumber(a.size);
          const bSize = sizeToNumber(b.size);
          return aSize - bSize;
        }

        // Sort by rimsize, extracting the numeric part for comparison
        const aRimSize = parseInt(a.rimsize.split(' ')[0]);
        const bRimSize = parseInt(b.rimsize.split(' ')[0]);
        return aRimSize - bRimSize;
      });
    });

    this.groupedData = Object.values(grouped);
  }


  // Add a single tyre to the table
  addNewTyre(newTyre: Tyre) {
    this.solidTyreSmart.push(newTyre);
    this.groupDataByCategory();
  }

  // Update an existing tyre in the table
  updateExistingTyre(updatedTyre: Tyre) {
    const index = this.solidTyreSmart.findIndex((tyre) => tyre.id === updatedTyre.id);
    if (index !== -1) {
      // Update the existing tyre
      this.solidTyreSmart[index] = updatedTyre;
      // Refresh grouped data
      this.groupDataByCategory();
    }
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  onDelete(item: any) {
    if (confirm(`Are you sure you want to delete ${item.size}?`)) {
      this.productService.deleteSolidTyreSmart(item.id).subscribe({
        next: () => {
          this.SnackBarService.success('Product deleted successfully!', null, 2000);
          this.solidTyreSmart = this.solidTyreSmart.filter(tyre => tyre.id !== item.id);
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
