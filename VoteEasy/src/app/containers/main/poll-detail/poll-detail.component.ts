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
  pollData: Observable<Poll[]>;
  subscribe: Subscription;
	title: string;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRoot.State>) {

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
          }
        });
      });
  	});
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

}
