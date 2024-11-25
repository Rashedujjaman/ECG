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

  getCompounds(): Observable<Compound[]> {
    return this.http.get<Compound[]>(`${this.apiUrl}/getCompounds`);
  }

  updateCompound(compound: Compound): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCompound/${compound.id}`, compound);
  }

  deleteCompound(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCompound/${id}`);
  }
}
