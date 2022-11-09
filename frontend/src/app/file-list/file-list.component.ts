import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
    })
  }

  ngOnDestroy(): void {
      this.paramsSub.unsubscribe();
  }

}
