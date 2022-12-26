import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repository } from '../models/repository';
import { RepositoryService } from '../services/repository/repository.service';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {

  public repositoryId: string = "";
  private paramsSub: any;

  public repository: Repository | undefined = undefined;
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
      this.loadRepository();
    });
  }

  private loadRepository() {
    this.repositoryService.get(this.repositoryId).subscribe((repository: Repository) => {
      this.repository = repository;
    })
  }

}
