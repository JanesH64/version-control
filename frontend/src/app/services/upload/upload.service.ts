import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  uploadFile(file: File) {
      const formData = new FormData();
      formData.append("file", file);
      return this.httpClient.post(`${environment.api}/file`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
}
