import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgametresPageRoutingModule } from './addgametres-routing.module';

import { AddgametresPage } from './addgametres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgametresPageRoutingModule
  ],
  declarations: [AddgametresPage]
})
export class AddgametresPageModule {}
