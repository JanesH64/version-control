import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompareVersionComponent } from '../compare-version/compare-version.component';
import { FileData } from '../models/fileData';
import { TextFile } from '../models/textFile';
import { FileService } from '../services/file/file.service';
import { NotificationService } from '../services/notification/notification.service';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

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
    private fileService: FileService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
   
  }

  dateSortFn(a: FileData, b: FileData): Number {
    let aDate = new Date(a.creationDate);
    let bDate = new Date(a.creationDate);

    return aDate.valueOf() - bDate.valueOf();
  }

  restoreVersion(versionId: string) {
    this.fileService.restoreVersion(this.file?.id, versionId).subscribe(() => {
      this.fileChanged.emit("File Changed");
    })
  }

  openTagDialog(version: FileData) {
    let dialogRef = this.dialog.open(TagDialogComponent, {
      data: version,
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(tags => {
      if(!tags) return;

      version.tags = tags;
      this.fileService.updateVersion(version, this.file?.id).subscribe(() => {
        this.notificationService.success("Saved tags successfully!");
        this.fileChanged.emit("File changed");
      })
    })
  }

  compareVersion(version: FileData) {
    if(!this.file) return; 

    let map = new Map(Object.entries(this.file.versions));
    let vals = Array.from(map.values());
    
    let versions = vals.filter(v => {
      return v?.id != version.id; 
    });
    this.dialog.open(CompareVersionComponent, { data: {version: version, versions: versions}});
  }
}
