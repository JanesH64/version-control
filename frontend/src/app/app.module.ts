import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { FileListComponent } from './file-list/file-list.component';
import { VersionListComponent } from './version-list/version-list.component';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatTabsModule} from '@angular/material/tabs'; 

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AddNewComponent } from './add-new/add-new.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { RepositoryComponent } from './repository/repository.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileMetadataComponent } from './file-metadata/file-metadata.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryListComponent,
    FileListComponent,
    VersionListComponent,
    AddNewComponent,
    ErrorDialogComponent,
    RepositoryDetailsComponent,
    FileDetailsComponent,
    RepositoryComponent,
    FileUploadComponent,
    FileMetadataComponent,
    OrderByPipe,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {delay: 200}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
