import { reducer } from './polls';
import { User } from '../models/user.model';
import { Poll } from '../models/poll.model';
import * as actionImports from '../actions/polls';

describe('polls reducer logic', () => {

  it('load the initial set of polls', () => {
  	const poll: Array<Poll> = [
  		{
        poll_title: 'some title',
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}
  	]

  	const initialState = [];

  	const action: actionImports.ActionInterface = new actionImports.GetPollsAction(
  		poll
	);

  	const nextState = reducer(initialState, action);	

  	expect(nextState).toEqual(poll);
  });

  it('allows the addition of a new poll containing required data', () => {
  	const poll: Array<Poll> = [
  		{
        poll_title: 'some new title',
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}
  	]

  	const newPoll: Poll = {
      poll_title: 'another new title', 
  		poll_id: 2, 
  		options: [
  			{name: 'option_3', votes: 5}, 
  			{name: 'option_4', votes: 7}
  		], 
  		voter_ids: [], 
  		createdBy: 'relevant_name'
  	};

  	const initialState = poll;

  	const action: actionImports.ActionInterface = new actionImports.AddPollAction(
  	 	newPoll
	)

  	const nextState = reducer(initialState, action);

  	const expectedState: Array<Poll> = [
  		{
        poll_title: 'some new title', 
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}, 
  		{
        poll_title: 'another new title',
	  		poll_id: 2, 
	  		options: [
	  			{name: 'option_3', votes: 5}, 
	  			{name: 'option_4', votes: 7}
	  		], 
	  		voter_ids: [], 
	  		createdBy: 'relevant_name'
	  	}
  	]

  	expect(nextState).toEqual(expectedState);
  });

  it('allows the addition of a new option to a specific poll', () => {
  	const polls: Array<Poll> = [
  		{
        poll_title: 'hello',
        poll_id: 1, 
        options: [
          {name: 'option 1', votes: 2}, 
          {name: 'option 2', votes: 3}
        ], 
        voter_ids: [123, 125, 253], 
        createdBy: 'username'
      }, 
      {
        poll_title: 'please stop', 
        poll_id: 2, 
        options: [
          {name: 'option_3', votes: 5}, 
          {name: 'option_4', votes: 7}
        ], 
        voter_ids: [], 
        createdBy: 'relevant_name'
      }
  	];

  	const expectedPoll: Array<Poll> = [
  		{
        poll_title: 'hello',
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}, 
  				{name: 'option 3', votes: 0}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}, 
  		{
        poll_title: 'please stop', 
  			poll_id: 2, 
	  		options: [
	  			{name: 'option_3', votes: 5}, 
	  			{name: 'option_4', votes: 7}
	  		], 
	  		voter_ids: [], 
	  		createdBy: 'relevant_name'
  		}
  	]

  	const initialState = polls;

	const action: actionImports.ActionInterface = new actionImports.AddOptionAction(
		{ 
			poll_id: 1, 
			new_option: { name: 'option 3', votes: 0 }
	    }
	);

  	const nextState = reducer(initialState, action);

  	expect(nextState).toEqual(expectedPoll);
  });

  it('allows voting on a specific option on a poll', () => {
  	const polls: Array<Poll> = [
  		{
        poll_title: 'what', 
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}, 
  		{
        poll_title: 'do', 
  			poll_id: 2, 
	  		options: [
	  			{name: 'option_3', votes: 5}, 
	  			{name: 'option_4', votes: 7}
	  		], 
	  		voter_ids: [], 
	  		createdBy: 'relevant_name'
  		}
  	];

  	const initialState = polls;

  	const expectedState = [
  		{
        poll_title: 'what', 
        poll_id: 1, 
        options: [
          {name: 'option 1', votes: 2}, 
          {name: 'option 2', votes: 3}
        ], 
        voter_ids: [123, 125, 253], 
        createdBy: 'username'
      }, 
      {
        poll_title: 'do', 
        poll_id: 2, 
        options: [
          {name: 'option_3', votes: 6}, 
          {name: 'option_4', votes: 7}
        ], 
        voter_ids: [], 
        createdBy: 'relevant_name'
      }
  	]

	const action: actionImports.ActionInterface = new actionImports.AddVoteAction(
		{ 
			poll_id: 2, 
			vote: 'option_3'
		}
	);

  	const nextState = reducer(initialState, action);

  	expect(nextState).toEqual(expectedState);

  });

  it('should allow me to delete a poll', () => {
  	const polls: Array<Poll> = [
  		{
        poll_title: 'please stop', 
  			poll_id: 1, 
  			options: [
  				{name: 'option 1', votes: 2}, 
  				{name: 'option 2', votes: 3}
  			], 
  			voter_ids: [123, 125, 253], 
  			createdBy: 'username'
  		}, 
  		{
        poll_title: 'whatever', 
  			poll_id: 2, 
	  		options: [
	  			{name: 'option_3', votes: 5}, 
	  			{name: 'option_4', votes: 7}
	  		], 
	  		voter_ids: [], 
	  		createdBy: 'relevant_name'
  		}
  	];

  	const initialState = polls;

  	const action: actionImports.ActionInterface = new actionImports.DeletePollAction(
  		{
  			poll_id: 1
		}
	);

  	const nextState = reducer(initialState, action);

  	const expectedState: Array<Poll> = [
  		{
        poll_title: 'whatever', 
  			poll_id: 2, 
	  		options: [
	  			{name: 'option_3', votes: 5}, 
	  			{name: 'option_4', votes: 7}
	  		], 
	  		voter_ids: [], 
	  		createdBy: 'relevant_name'
  		}
  	]

  	expect(nextState).toEqual(expectedState);
  });

});