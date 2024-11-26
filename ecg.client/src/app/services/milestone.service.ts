import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private apiUrl = '/api/Milestone';

  constructor(private http: HttpClient) { }

  addMilestone(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddMilestone`, data);
  }

  getMilestones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetMilestones`);
  }

  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/DownloadFile/${fileId}`, {
      responseType: 'blob'
    });
  }

  deleteFileById(fileId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteFileById/${fileId}`);
  }
}
