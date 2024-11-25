import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tyre } from '../../../interfaces/tyre';
import { ProductService } from '../../../services/product.service';

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

  title1: string = 'Solid Tyres';
  title2: string = 'Smart';
  imageUrl: string = 'assets/images/solid-tyre-smart.png';

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit() {
    this.getSolidTyreSmart();
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  getSolidTyreSmart() {
    //this.http.get<Tyre[]>('/api/solidTyreSmart/GetSolidTyreSmart').subscribe(
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
}
