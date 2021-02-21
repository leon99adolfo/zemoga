import { NgModule } from '@angular/core';
import { PastTrialsComponent } from './past-trials/past-trials.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { SharedModule } from 'app/core/modules/shared.module';

@NgModule({
  declarations: [
    PastTrialsComponent, 
    HowItWorksComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PastTrialsComponent, 
    HowItWorksComponent
  ]
})
export class InfoPagesModule { }
