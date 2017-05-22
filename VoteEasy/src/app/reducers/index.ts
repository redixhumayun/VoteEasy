import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';

import { User } from '../models/user.model';
import { Poll } from '../models/poll.model';
import * as pollReducer from './polls';
import * as userReducer from './users';

export interface State {
	users: Array<User>, 
	polls: Array<Poll>, 
	currentPoll: number, 
	loading: boolean
};

const reducers = {
	users: userReducer.reducer, 
	polls: pollReducer.reducer
}

export const reducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

