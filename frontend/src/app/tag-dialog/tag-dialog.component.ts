import { Component, Inject, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileData } from '../models/fileData';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

  public tags: string[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FileData,
    private dialogRef: MatDialogRef<TagDialogComponent>
  ) { 
    if(!data.tags) {
      this.tags = new Array<string>;
    }
    else {
      this.tags = [...data.tags];
    }
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.tags);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
