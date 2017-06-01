import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../reducers';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  data: Observable<{ title: string[], poll_id: number[] }>;
  titles: string[];
  ids: number[];
  subscribe: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {
	
  }

  ngOnInit() {
  	
    this.data = Observable.combineLatest(
      this.store.select(fromRoot.pollTitleSelector), 
      this.store.select(fromRoot.pollIdSelector), 
      (title, poll_id) => {
        return { title, poll_id }
      });

    this.subscribe = this.data.subscribe((data) => {
      this.titles = data.title;
      this.ids = data.poll_id;
    });
  }


  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
