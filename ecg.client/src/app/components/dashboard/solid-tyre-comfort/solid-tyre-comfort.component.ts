import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tyre } from '../../../interfaces/tyre';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'solid-tyre-comfort',
  templateUrl: './solid-tyre-comfort.component.html',
  styleUrl: './solid-tyre-comfort.component.css'
})

export class SolidTyreComfortComponent implements OnInit {
  public solidTyreComfort: Tyre[] = [];
  public groupedData: any[] = [];

  //table data
  title1: string = 'Solid Tyres';
  title2: string = 'Comfort';
  imageUrl: string = 'assets/images/solid-tyre-comfort.png';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getSolidTyreComfort();
  }

  getSolidTyreComfort() {
    this.http.get<Tyre[]>('/api/solidTyreComfort/GetSolidTyreComfort').subscribe(
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

    this.groupedData = Object.values(grouped);
  }

}
