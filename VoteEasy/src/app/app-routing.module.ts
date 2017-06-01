import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './containers/main/main.component';
import { PollDetailComponent } from './containers/main/poll-detail/poll-detail.component';
import { CallbackComponent } from './components/callback.component'; 
import { UserPollComponent } from './containers/main/user-poll/user-poll.component';
import { NewPollComponent } from './containers/main/new-poll/new-poll.component';


const appRoutes: Routes = [
	{ path: '', component: MainComponent }, 
	{ path: 'poll-detail/:poll_id', component: PollDetailComponent }, 
	{ path: 'callback', component: CallbackComponent }, 
	{ path: 'user-polls/:user_id', component: UserPollComponent }, 
	{ path: 'new-poll/:user_id', component: NewPollComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ], 
	exports: [ RouterModule ]
})

export class AppRoutingModule {

}