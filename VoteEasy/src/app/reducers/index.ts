import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

import { User } from '../models/user.model';
import { Poll } from '../models/poll.model';
import * as pollReducer from './polls';
import * as userReducer from './users';

export interface State {
	users: Array<User>, 
	polls: Array<Poll>
};

const reducers = {
	users: userReducer.reducer, 
	polls: pollReducer.reducer
}

const getPollTitles = (state: State) => state.polls.map(poll => poll.poll_title);
const getPollId = (state: State) => state.polls.map(poll => poll.poll_id);
const getPollOptions = (state: State) => state.polls.map(poll => poll.options);
const getPollCreatedBy = (state: State) => state.polls.map(poll => poll.createdBy);


export const pollTitleSelector = createSelector(getPollTitles, pollTitle => pollTitle);
export const pollIdSelector = createSelector(getPollId, pollId => pollId);
export const getPollOptionsSelector = createSelector(getPollOptions, pollOptions => pollOptions);


export const reducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

