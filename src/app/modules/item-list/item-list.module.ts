import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ItemListComponent } from './item-list.component';

@NgModule({
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class ItemListModule {}
