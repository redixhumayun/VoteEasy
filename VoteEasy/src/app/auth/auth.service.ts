import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth0-variables';
import { tokenNotExpired } from 'angular2-jwt';
import auth0 from 'auth0-js';

import * as fromRoot from '../reducers';
import * as userActions from '../actions/users';
import { User } from '../models/user.model';

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  user_id: string;
  user_id$ = new BehaviorSubject<string>(this.user_id);

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    // If authenticated, set local profile property and update login status subject
    if (this.isAuthenticated()) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean): void {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(): void {
    // Auth0 authorize request
    // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE
    });
  }

  handleAuth(): void {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult): void {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile): void {
    // Save session data and update login status subject
    this.dispatchUser(profile);
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.setLoggedIn(true);
  }

  private dispatchUser(userProfile) {
    this.user_id = this.getUserId(userProfile.sub);
    console.log(this.user_id);
    this.user_id$.next(this.user_id);
    const newUser: User = {
      userName: userProfile.sub, 
      user_id: this.user_id, 
      isLoggedIn: true, 
      polls_created_id: []
    };

    this.store.dispatch(new userActions.AddUserAction(newUser));
  }

  private getUserId(userString) {
    let userStringCopy = userString;
    return userString.split('').map((char, index) => {
      if(char === '|') {
        return userStringCopy.slice(index + 1, userStringCopy.length + 1);
      } else {
        return ''
      }
    }).join('');
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  public isAuthenticated(): boolean {
    // Check if there's an unexpired access token
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log('Checking isAuthenticated');
    return new Date().getTime() < expiresAt;
  }

}