import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tyre } from '../../../interfaces/tyre';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'solid-tyre-rib',
  template: `<app-table [groupedData]="groupedData" [title1]="title1" [title2]="title2" [imageUrl]="imageUrl"></app-table>`,
})

export class SolidTyreRibComponent implements OnInit {
  public solidTyreRib: Tyre[] = [];
  public groupedData: any[] = [];

  title1: string = 'Solid Tyres';
  title2: string = 'Rib';
  imageUrl: string = 'assets/images/solid-tyre-rib.png';

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit() {
    this.getSolidTyreRib();
  }

  getSolidTyreRib() {
    //this.http.get<Tyre[]>('/api/solidTyreRib/GetSolidTyreRib').subscribe(
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
}
