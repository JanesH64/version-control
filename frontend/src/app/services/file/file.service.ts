import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextFile } from 'src/app/models/textFile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(repositoryId: string): Observable<Array<TextFile>> {
    return this.httpClient.get<Array<TextFile>>(`${environment.api}/files/${repositoryId}`);
  }

  getById(repositoryId: string, fileId: string): Observable<TextFile> {
    return this.httpClient.get<TextFile>(`${environment.api}/files/${repositoryId}/${fileId}`);
  }

  uploadNewFile(file: File, repositoryId: string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post(`${environment.api}/files/${repositoryId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  downloadVersion(fileId: string | undefined, id: string | undefined): Observable<Blob> {
    return this.httpClient.get(`${environment.api}/files/${fileId}/versions/${id}`, {
      responseType: 'blob'
    });
  }

  uploadNewVersion(file: File, fileId: string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post(`${environment.api}/files/${fileId}/versions`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  lockFile(fileId: string | undefined): Observable<any> {
    return this.httpClient.post(`${environment.api}/files/${fileId}/lock`, true);
  }
}
