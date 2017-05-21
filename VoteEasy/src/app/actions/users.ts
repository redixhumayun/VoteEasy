import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const SWITCH_LOG_IN_STATUS = 'SWITCH_LOG_IN_STATUS';
export const ADD_POLL_TO_USER = 'ADD_POLL_TO_USER';

export class GetUsersAction implements Action {
	constructor(public payload: {users: Array<User>}) {
		this.payload = payload;
	}
	readonly type = GET_USERS;
}

export class AddUserAction implements Action {
	constructor(public payload: User) {
		this.payload = payload;
	}
	readonly type = ADD_USER;
}

export class SwitchLogInStatusAction implements Action {
	constructor (public payload: { user_id: string }) {
		this.payload = payload;
	}
	readonly type = SWITCH_LOG_IN_STATUS;
}

export class AddPollAction implements Action {
	constructor (public payload: { user_id: string, poll_id: number }) {
		this.payload = payload;
	}
	readonly type = ADD_POLL_TO_USER;
}

export interface ActionInterface {
	type: string, 
	payload: any;
};