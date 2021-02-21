import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MainVotesComponent } from './main-votes/main-votes.component';
import { SharedModule } from './core/modules/shared.module';
import { VoteCandidateComponent } from './main-votes/vote-candidate/vote-candidate.component';
import { InfoPagesModule } from './info-pages/info-pages.module';
import { PastTrialsComponent } from './info-pages/past-trials/past-trials.component';
import { HowItWorksComponent } from './info-pages/how-it-works/how-it-works.component';


const appRoutes: Routes = [
  { path: 'apps/votes', component: MainVotesComponent },
  { path: 'apps/pasttrials', component: PastTrialsComponent },
  { path: 'apps/howitworks', component: HowItWorksComponent },
  { path: '**', redirectTo: 'apps/votes' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainVotesComponent,
    VoteCandidateComponent
  ],
  imports: [
    SharedModule,
    InfoPagesModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
