import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tyre } from '../interfaces/tyre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getSolidTyreComfort(): Observable<any> {
    return this.http.get<Tyre[]>(`/api/solidTyreComfort/GetSolidTyreComfort`);
  }

  getSolidTyreSmart(): Observable<any> {
    return this.http.get<Tyre[]>(`/api/solidTyreSmart/GetSolidTyreSmart`);
  }

  getSolidTyreRib(): Observable<any> {
    return this.http.get<Tyre[]>(`/api/solidTyreRib/GetSolidTyreRib`);
  }

  //Add Product
  addSolidTyreComfort(data : any): Observable<any> {
    return this.http.post<Tyre[]>(`/api/solidTyreComfort/AddSolidTyreComfort`, data);
  }

  addSolidTyreSmart(data: any): Observable<any> {
    return this.http.post<Tyre[]>(`/api/solidTyreSmart/AddSolidTyreSmart`, data);
  }

  addSolidTyreRib(data: any): Observable<any> {
    return this.http.post<Tyre[]>(`/api/solidTyreRib/AddSolidTyreRib`, data);
  }

  //Update Product
  updateSolidTyreComfort(data: any): Observable<any> {
    return this.http.put(`/api/solidTyreComfort/UpdateSolidTyreComfort/${data.id}`, data);
  }

  updateSolidTyreSmart(data: any): Observable<any> {
    return this.http.put(`/api/solidTyreSmart/UpdateSolidTyreSmart/${data.id}`, data);
  }

  updateSolidTyreRib(data: any): Observable<any> {
    return this.http.put(`/api/solidTyreRib/UpdateSolidTyreRib/${data.id}`, data);
  }


  //Delete Product
  deleteSolidTyreComfort(id: number): Observable<any> {
    return this.http.delete(`/api/solidTyreComfort/DeleteSolidTyreComfort/${id}`);
  }

  deleteSolidTyreSmart(id: number): Observable<any> {
    return this.http.delete(`/api/solidTyreSmart/DeleteSolidTyreSmart/${id}`);
  }

  deleteSolidTyreRib(id: number): Observable<any> {
    return this.http.delete(`/api/solidTyreRib/DeleteSolidTyreRib/${id}`);
  }
}
