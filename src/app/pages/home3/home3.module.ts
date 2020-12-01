import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Home3PageRoutingModule } from './home3-routing.module';

import { Home3Page } from './home3.page';
import { ShareModule } from '../../progress/progress.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home3PageRoutingModule,
    ShareModule
  ],
  declarations: [Home3Page]
})
export class Home3PageModule {}
