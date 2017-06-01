import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store'; 

import * as fromRoot from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private store: Store<fromRoot.State>) { }

	ngOnInit() {
		
	}


  title = 'app works!';
}
