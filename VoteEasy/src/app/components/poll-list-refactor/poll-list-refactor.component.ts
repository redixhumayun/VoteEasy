import { Component, OnInit, Input, Output } from '@angular/core';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-poll-list-refactor',
  templateUrl: './poll-list-refactor.component.html',
  styleUrls: ['./poll-list-refactor.component.css']
})
export class PollListRefactorComponent implements OnInit {
	@Input() title: string;
	@Input() id: number;

  constructor() { }

  ngOnInit() {
  	
  }

}
