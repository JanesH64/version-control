import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from 'src/app/models/repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<Array<Repository>> {
    return this.httpClient.get<Array<Repository>>(`${environment.api}/repositories`);
  }

  get(repositoryId: string): Observable<Repository> {
    return this.httpClient.get<Repository>(`${environment.api}/repositories/${repositoryId}`);
  }

  add(name: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.api}/repositories`, name);
  }

  delete(repositoryId: string) {
    return this.httpClient.delete(`${environment.api}/repositories/${repositoryId}`);
  }
}
