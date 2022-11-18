import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextFile } from 'src/app/models/textFile';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<Array<TextFile>> {
    return this.httpClient.get<Array<TextFile>>(`${environment.api}/files`);
  }

  upload(file: File) {
      const formData = new FormData();
      formData.append("file", file);
      return this.httpClient.post(`${environment.api}/files`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
}
