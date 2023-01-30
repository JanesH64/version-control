import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from '../add-new/add-new.component';
import { Repository } from '../models/repository';
import { ErrorHandlerService } from '../services/error/error-handler.service';
import { NotificationService } from '../services/notification/notification.service';
import { RepositoryService } from '../services/repository/repository.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

  @Input()
  public repositoryId: string = "";

  private dialogHeading: string = "repository"
  private dialogData: unknown = {
    heading: this.dialogHeading
  }

  public repositories: Array<Repository> = [];
  public isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private errorHandlerService: ErrorHandlerService,
    private repositoryService: RepositoryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadRepositories();
  }

  loadRepositories() {
    this.isLoading = true;
    this.repositoryService.getAll().subscribe((repositories) => {
      this.repositories = repositories;

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    })
  }

  addNewRepository(): void {
    let dialogRef = this.dialog.open(AddNewComponent, {
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(name => {
      if(!name) {
        return;
      }

      let existingRepository = this.repositories.find(repo => repo.name === name);
      if(existingRepository) {
        this.errorHandlerService.handleErrorMessage("Repository already exists!");
        return;
      }

      this.repositoryService.add(name).subscribe(() => {
        this.notificationService.success("Repository created successfully!");
        this.loadRepositories();
      });
    });
  }

  deleteRepository(repositoryId: string): void {
    this.repositoryService.delete(repositoryId).subscribe(() => {
      this.notificationService.success("Repository deleted successfully!");
      this.loadRepositories();
    })
  }
}
