import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { TextFile } from '../models/textFile';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {

  public repositoryId: string = "";
  private paramsSub: any;

  public files: Array<TextFile> = [];
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
      this.loadFiles();
    });
  }

  loadFiles(): void {
    this.isLoading = true;
    this.fileService.getAll(this.repositoryId).subscribe((files) => {
      this.files = files;
      this.isLoading = false;
    })
  }
  
  openUploadDialog(): void {
    this.dialog.open(FileUploadComponent, {
      data: {
        repositoryId: this.repositoryId
      }
    }).afterClosed().subscribe(() => {
      this.loadFiles();
    })
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  sortByNameFn(a: TextFile, b: TextFile): Number {
    if(a?.name < b?.name) return -1;
    if(a?.name > b?.name) return 1;

    return 0;
  }

}
