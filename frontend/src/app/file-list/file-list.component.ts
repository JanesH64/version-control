import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { File } from '../models/file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {

  public repositoryId: string = "";
  private paramsSub: any;

  public file1: File = {
    id: "1",
    title: "Testfile 1"
  }

  public file2: File = {
    id: "2",
    title: "Testfile 2"
  }

  public files: Array<File> = [this.file1, this.file2]

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
    })
  }

  ngOnDestroy(): void {
      this.paramsSub.unsubscribe();
  }

  openUploadDialog(): void {
    this.dialog.open(FileUploadComponent);
  }

}
