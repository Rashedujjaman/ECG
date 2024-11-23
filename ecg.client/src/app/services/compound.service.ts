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
  addCompound(compound: Compound) {
    return this.http.post(`${this.apiUrl}/addCompound`, compound);
  }
  deleteCompound(compound: Compound) {
    return this.http.delete(`${this.apiUrl}/deleteCompound/${compound.id}`);
  }
}
