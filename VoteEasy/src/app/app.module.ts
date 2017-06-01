import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers';
import { logger } from './reducers/middleware/logger.middleware';  

import { AppComponent } from './app.component';
import { MouseOverDirective } from './shared/mouseover.directive';
import { MainComponent } from './containers/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { PollDetailComponent } from './containers/main/poll-detail/poll-detail.component';
import { PollListRefactorComponent } from './components/poll-list-refactor/poll-list-refactor.component';
import { HeaderComponent } from './containers/main/header/header.component';
import { CallbackComponent } from './components/callback.component';

import { AuthService } from './auth/auth.service';
import { UserPollComponent } from './containers/main/user-poll/user-poll.component';
import { NewPollComponent } from './containers/main/new-poll/new-poll.component';


@NgModule({
  declarations: [
    AppComponent,
    MouseOverDirective,
    MainComponent,
    PollDetailComponent,
    PollListRefactorComponent,
    HeaderComponent,
    CallbackComponent,
    UserPollComponent,
    NewPollComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    StoreModule.provideStore(logger(reducer))
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
