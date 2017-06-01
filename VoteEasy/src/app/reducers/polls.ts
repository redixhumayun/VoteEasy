import { Poll } from '../models/poll.model';

interface Action {
	(state: Array<Poll>, action: {type: string, payload: any}) : Array<Poll>;
}

const initialState: Array<Poll> = [
	{
		poll_title: 'What is your favorite food?',
		poll_id: 1, 
		options: [ { name: 'option_1', votes: 0 }, { name: 'option_2', votes: 1 } ], 
		voter_ids: [1156, 1555], 
		createdBy: '601643662'
	}, 
	{
		poll_title: 'What is your favorite game?',
		poll_id: 2, 
		options: [ { name: 'option_3', votes: 0 }, { name: 'option_4', votes: 1 } ], 
		voter_ids: [1156, 1555], 
		createdBy: '601643662'
	}, 
	{
		poll_title: 'What is your favorite travel destination?', 
		poll_id: 3, 
		options: [ { name: 'option_5', votes: 0 }, { name: 'option_6', votes: 1 } ], 
		voter_ids: [1156, 1555], 
		createdBy: 'redixhumayun'
	}, 
	{
		poll_title: 'What do you want to do?', 
		poll_id: 4, 
		options: [ { name: 'option_7', votes: 0 }, { name: 'option_8', votes: 1 } ], 
		voter_ids: [1156, 1555], 
		createdBy: 'redixhumayun'
	}

]

export const reducer: Action = (state: Array<Poll> = initialState, action) => {
	switch(action.type) {
		case 'GET_POLLS':
			return action.payload;

		case 'ADD_POLL':
			return [...state, action.payload];

		case 'ADD_OPTION':
			return addOption(state, action.payload.poll_id, action.payload);

		case 'ADD_VOTE':
			return increaseVoteCount(state, action.payload);

		case 'DELETE_POLL':
			return deletePoll(state, action.payload);

		default: 
			return state;
	}
}

const addOption = (state: Array<Poll>, id: number, payload: any) => {
	return state.map((poll) => {
		if(poll.poll_id === id) {
			return { ...poll, options: poll.options.concat(payload.new_option) }
		}else {
			return { ... poll }
		}
	});
}

const increaseVoteCount = (state: Array<Poll>, payload: {poll_id: number, vote: string}) => {
	return state.map((poll) => {
		if(poll.poll_id === payload.poll_id) {
			let optionsCopy = poll.options;
			optionsCopy = optionsCopy.map((option) => {
				if(option.name === payload.vote) {
					return { ...option, votes: option.votes + 1 }
				} else {
					return { ...option }
				}
			});
			return Object.assign({}, poll, { options: optionsCopy });
		} else {
			return { ...poll }
		}
	});
} 

const deletePoll = (state: Array<Poll>, payload: {poll_id: number}) => {
	return state.filter((poll) => {
		if(poll.poll_id !== payload.poll_id) {
			return { ...poll }
		}
	});
}