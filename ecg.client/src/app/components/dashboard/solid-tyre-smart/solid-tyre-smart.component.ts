import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tyre } from '../../../models/tyre';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'solid-tyre-smart',
  templateUrl: './solid-tyre-smart.component.html',
  styleUrl: './solid-tyre-smart.component.css'
})

export class SolidTyreSmartComponent implements OnInit {
  public solidTyreSmart: Tyre[] = [];
  public groupedData: any[] = [];

  title1: string = 'Solid Tyres';
  title2: string = 'Smart';
  imageUrl: string = 'assets/images/solid-tyre-smart.png';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSolidTyreSmart();
  }

  getSolidTyreSmart() {
    this.http.get<Tyre[]>('/api/solidTyreSmart/GetSolidTyreSmart').subscribe(
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

}
