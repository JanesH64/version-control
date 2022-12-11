import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextFile } from '../models/textFile';
import { FileService } from '../services/file/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

  public repositoryId: string = "";
  public fileId: string = "";
  private paramsSub: any;

  public file: TextFile | undefined = undefined;
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService
  ) { 
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
      this.fileId = params['fileid'];
      this.loadFiles();
    });
  }

  ngOnInit(): void {
  }

  loadFiles(): void {
    this.isLoading = true;
    this.fileService.getById(this.repositoryId, this.fileId).subscribe((file) => {
      this.file = file;
      this.isLoading = false;
    })
  }

  downloadFile(): void {
    this.fileService.downloadVersion(this.file?.id, this.file?.head.id).subscribe(blob => saveAs(blob, this.file?.name));;
  }
}
