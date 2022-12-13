import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextFile } from '../models/textFile';
import { FileService } from '../services/file/file.service';
import { saveAs } from 'file-saver';
import { NotificationService } from '../services/notification/notification.service';
import { DvDialogConfig } from '../models/dvDialogConfig';

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
    private fileService: FileService,
    private notificationService: NotificationService
  ) { 
    this.paramsSub = this.route.params.subscribe(params => {
      this.repositoryId = params['repositoryid'];
      this.fileId = params['fileid'];
      this.loadFile();
    });
  }

  ngOnInit(): void {
  }

  loadFile(): void {
    this.isLoading = true;
    this.fileService.getById(this.repositoryId, this.fileId).subscribe((file) => {
      this.file = file;

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    })
  }

  openDownloadDialog(): void {
    let config: DvDialogConfig = {
      title: "File download",
      message: "Do you want to start editing and lock the file?",
      buttons: [
        {
          text: "Download",
          action: this.downloadFile.bind(this)
        },
        {
          text: "Lock & Download",
          action: this.lockAndDownload.bind(this)
        }
      ]
    }
    this.notificationService.confirm(config);
  }

  lockAndDownload(): void {
    this.fileService.lockFile(this.file?.id).subscribe(() => {
      this.loadFile();
    })
  }

  downloadFile(): void {
    this.fileService.downloadVersion(this.file?.id, this.file?.head.id).subscribe(blob => saveAs(blob, this.file?.name));;
  }
}
