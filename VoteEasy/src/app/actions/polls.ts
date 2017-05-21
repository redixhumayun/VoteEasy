import { Action } from '@ngrx/store';
import { Poll } from '../models/poll.model';

export const GET_POLLS = 'GET_POLLS';
export const ADD_POLL = 'ADD_POLL';
export const ADD_OPTION = 'ADD_OPTION';
export const ADD_VOTE = 'ADD_VOTE';
export const DELETE_POLL = 'DELETE_POLL';

export class GetPollsAction implements Action {
	constructor(public payload: Array<Poll>) {
		this.payload = payload;
	}
	readonly type = GET_POLLS;
}

export class AddPollAction implements Action {
	constructor(public payload: Poll) {
		this.payload = payload;
	}
	readonly type = ADD_POLL;
}

export class AddOptionAction implements Action {
	constructor(public payload: { poll_id: number, new_option: { name: string, votes: number } }) {
		this.payload = payload;
	}
	readonly type = ADD_OPTION;
}

export class AddVoteAction implements Action {
	constructor(public payload: { poll_id: number, vote: string }) {
		this.payload = payload;
	}
	readonly type = ADD_VOTE;
}

export class DeletePollAction implements Action {
	constructor(public payload: { poll_id: number }) {
		this.payload = payload;
	}
	readonly type = DELETE_POLL;
}

export interface ActionInterface {
	type: string, 
	payload: any;
};