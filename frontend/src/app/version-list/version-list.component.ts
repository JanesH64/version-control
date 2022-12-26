import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileData } from '../models/fileData';
import { TextFile } from '../models/textFile';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {
  public isLoading: boolean = false;

  @Input()
  public file: TextFile | undefined = undefined

  @Output()
  public fileChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
   
  }

  dateSortFn(a: FileData, b: FileData): Number {
    let aDate = new Date(a.creationDate);
    let bDate = new Date(a.creationDate);

    return aDate.valueOf() - bDate.valueOf();
  }

  restoreVersion(versionId: string) {
    console.log("Restore")
    this.fileService.restoreVersion(this.file?.id, versionId).subscribe(() => {
      this.fileChanged.emit("File Changed");
    })
  }
}
