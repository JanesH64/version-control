import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { FileData } from '../models/fileData';

@Component({
  selector: 'app-compare-version',
  templateUrl: './compare-version.component.html',
  styleUrls: ['./compare-version.component.scss']
})
export class CompareVersionComponent implements OnInit {

  originalVersion: DiffEditorModel = {
    code: '',
    language: 'text/plain'
  };

  versionToCompare: DiffEditorModel = {
    code: '',
    language: 'text/plain'
  };

  selectedVersion!: FileData;

  constructor(
    public dialogRef: MatDialogRef<CompareVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {version: FileData, versions: FileData[]}
  ) { }

  ngOnInit(): void {
    this.originalVersion.code = this.data.version.content;
    this.selectedVersion = this.data.versions[0];
    this.selectVersionToCompare();
  }

  selectVersionToCompare() {
    this.versionToCompare.code = this.selectedVersion.content;
  }

  codeEditorOptions = {
    theme: 'vs-light',
    readOnly: true,
    padding: {
      bottom: '5px',
      top: '5px'
    }
  };

}
