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
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AddNewComponent } from './add-new/add-new.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { RepositoryComponent } from './repository/repository.component';

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
    RepositoryComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
