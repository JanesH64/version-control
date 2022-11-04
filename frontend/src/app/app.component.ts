import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'version-control-ui';
  data: string = "";

  constructor(
    private httpClient: HttpClient
  ) {}

  public getHello() {
    this.httpClient.get<string>(`${environment.api}/hello`)
      .subscribe((data: string) => this.data = data)
  }
}
