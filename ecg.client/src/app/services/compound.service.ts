import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compound } from '../interfaces/compound';

@Injectable({
  providedIn: 'root'
})

export class CompoundService {
  apiUrl = 'api/compound'
  constructor(private http: HttpClient) { }

  getCompounds(product: string): Observable<Compound[]> {
    return this.http.get<Compound[]>(`${this.apiUrl}/getCompounds/${product}`);
  }

  addCompound(compound: Compound): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCompound`, compound);
  }

  updateCompound(compound: Compound): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateCompound/${compound.id}`, compound);
  }

  deleteCompound(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteCompound/${id}`);
  }
}
