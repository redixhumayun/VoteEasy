import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as fromRoot from '../../../reducers';
import { Poll } from '../../../models/poll.model';

@Component({
  selector: 'app-user-poll',
  templateUrl: './user-poll.component.html',
  styleUrls: ['./user-poll.component.css']
})
export class UserPollComponent implements OnInit {

	user_id: string;
  subscribe: Subscription;
  data: Observable<Poll[]>;



  constructor(private router: Router, private route: ActivatedRoute,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => {
  		this.user_id = params['user_id'];

      this.data = this.store.select('polls');

      this.fetchData(this.data);
  	});
  }

  fetchData(data: Observable<Poll[]>) {
    this.data = data.map((pollArray: Poll[]) => {
      return pollArray.filter((poll) => {
        if(poll.createdBy === this.user_id) {
          return poll
        }
      });
    });
  }

}
