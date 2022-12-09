import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
  }
}
