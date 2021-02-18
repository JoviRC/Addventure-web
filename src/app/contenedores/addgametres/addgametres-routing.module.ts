import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddgametresPage } from './addgametres.page';

const routes: Routes = [
  {
    path: '',
    component: AddgametresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddgametresPageRoutingModule {}
