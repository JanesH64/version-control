import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareVersionComponent } from './compare-version/compare-version.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
  { path: 'repositories', component: RepositoryListComponent },
  { path: 'repositories/:repositoryid', component: RepositoryComponent,
    children: [
      { path: '', component: RepositoryDetailsComponent},
      { path: 'files/:fileid', component: FileDetailsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
