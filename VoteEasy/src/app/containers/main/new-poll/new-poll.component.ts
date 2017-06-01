import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Poll } from '../../../models/poll.model';
import * as fromRoot from '../../../reducers/index';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
	pollForm: FormGroup;
	newPoll: Poll;
	user_id: string;

  constructor(private route: ActivatedRoute, 
			  private router: Router, 
		  	  private store: Store<fromRoot.State>) { }

  ngOnInit() {
  	this.initForm();
  	this.route.params.subscribe((params: Params) => {
  		this.user_id = params['user_id'];
  	});
  }

  initForm() {
  	let title = '';
  	let options = '';

  	this.pollForm = new FormGroup({
  		'title': new FormControl(name, [Validators.required]),
  		'options': new FormControl(options, [Validators.required])
  	});
  }

  onSubmit() {
  	let options = this.pollForm.value['options'].split('\n')
					  .map((option) => {
					  	return Object.assign({ name: option, votes: 0 })
					  });

	let poll_title = this.pollForm.value['title'];

  	this.newPoll = {
  		poll_title: poll_title, 
  		options: options, 
  		poll_id: 5, 
  		createdBy: this.user_id, 
  		voter_ids: []
  	}
  }

}
