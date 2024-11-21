import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../interfaces/material';

@Injectable({
  providedIn: 'root'
})

export class MaterialService {
  constructor(private http: HttpClient) { }
  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>('/api/materials');
  }
  addMaterial(material: Material) {
    return this.http.post('/api/materials', material);
  }
  deleteMaterial(material: Material) {
    return this.http.delete(`/api/materials/${material.id}`);
  }
}
