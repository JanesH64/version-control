import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewComponent } from '../add-new/add-new.component';
import { Repository } from '../models/repository';
import { ErrorHandlerService } from '../services/error/error-handler.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

  @Input()
  public repositoryId: string = "";
  testRepo1: Repository = {
    name: "Test 1",
    id: "1",
    updated: "1999-10-1"
  }
  testRepo2: Repository = {
    name: "Test 2",
    id: "2",
    updated: "1999-10-1"
  }

  private dialogHeading: string = "repository"
  private dialogData: unknown = {
    heading: this.dialogHeading
  }

  public repositories: Array<Repository> = [this.testRepo1, this.testRepo2];

  constructor(
    private dialog: MatDialog,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  addNewRepository(): void {
    let dialogRef = this.dialog.open(AddNewComponent, {
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      let existingRepository = this.repositories.find(repo => repo.name === result);
      if(existingRepository) {
        this.errorHandlerService.handleError("Repository already exists!");
      }
    });
  }

}
