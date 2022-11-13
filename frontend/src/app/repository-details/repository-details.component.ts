import { Component, OnInit } from '@angular/core';
import { Repository } from '../models/repository';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {

  constructor() { }

  public repository: Repository | undefined;

  ngOnInit(): void {
    this.repository = {
      id: "1",
      name: "Test Repo",
      updated: "2022-09-11"
    }
  }

}
