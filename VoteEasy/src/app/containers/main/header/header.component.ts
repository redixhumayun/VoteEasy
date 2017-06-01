import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../../reducers'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated: boolean;
  subscribe: Subscription;

  user_id: string;
  subscribe_user_id: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
  	this.subscribe = this.authService.loggedIn$.subscribe(
                      (value) => {
                        this.authenticated = value;
                      });

    this.subscribe_user_id = this.authService.user_id$.subscribe(
                     (value ) => {
                       this.user_id = value;
                     });
  }


  onLogIn() {
  	this.authService.login();
  }

  onLogOut() {
  	this.authService.logout();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.subscribe_user_id.unsubscribe();
  }

}
