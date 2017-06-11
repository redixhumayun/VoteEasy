import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';   
import 'rxjs/Rx';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';

import * as fromRoot from '../../../reducers';
import * as pollAction from '../../../actions/polls';
import { Poll } from '../../../models/poll.model';
import { AuthService } from '../../../auth/auth.service'

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements OnInit, OnDestroy {
	@ViewChild('f') optionsForm: NgForm;
  @ViewChild('nf') newOptionsForm: NgForm;

	id: number;
	options: Array<{name: string, votes: number}>;
  createdBy: string
  pollData: Observable<Poll[]>;
  subscribe: Subscription;
	title: string;
  user_id: string;
  authenticated: boolean = false

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private store: Store<fromRoot.State>, 
    private authService: AuthService) {
  }

  ngOnInit() {
  	this.route.params.subscribe((params:Params) => {
  		this.id = +params['poll_id'];

      this.pollData = this.store.select('polls');

      this.subscribe = this.pollData.subscribe((data) => {
        data.map((datum) => {
          if(datum.poll_id == this.id) {
            this.title = datum.poll_title;
            this.options = datum.options;
            this.createdBy = datum.createdBy;
          }
        });
      });
  	});

    if(this.authService.isAuthenticated()) {
      this.authenticated = true;
      this.user_id = localStorage.getItem('user_id');
      console.log(this.user_id);
    } else {
      this.authenticated = false
    }
  }

  onSelectOption(form: NgForm) {
  	this.store.dispatch(new pollAction.AddVoteAction(
  			{ poll_id: this.id, vote: form.value.option }
  		)
  	);
    this.optionsForm.reset();
  }

  onNewOption(form: NgForm) {
    this.store.dispatch(new pollAction.AddOptionAction(
      { 
        poll_id: this.id, 
        new_option: { name: form.value.newOption, votes: 0 } 
      }
     )
    );
    this.newOptionsForm.reset();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  canDelete() {
    return this.authenticated && this.user_id == this.createdBy
  }

  onDelete() {
    this.store.dispatch(new pollAction.DeletePollAction({ poll_id: this.id }));
    this.router.navigate(['']);
  }

}
