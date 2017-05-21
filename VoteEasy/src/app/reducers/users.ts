import { User } from '../models/user.model';

const initialState: Array<User> = [
	{
		userName: '', 
		user_id: '', 
		isLoggedIn: false, 
		polls_created_id: []
	}
];

export const reducer = (state: Array<User> = initialState, action) => {
	switch(action.type) {
		case 'GET_USERS':
			return action.payload.users;

		case 'ADD_USER':
			return [...state, action.payload];

		case 'SWITCH_LOG_IN_STATUS':
			return flipLogInStatus(state, action.payload.user_id);

		case 'ADD_POLL_TO_USER':
			return addPollToUser(state, action.payload);

		default:
			return state;
	}
}

const flipLogInStatus = (state: Array<User>, id: string) => {
	return state.map((user) => {
		if(user.user_id === id) {
			return Object.assign({}, user, {isLoggedIn: !user.isLoggedIn})
		}else {
			return {...user}
		}
	});
}

const addPollToUser = (state: Array<User>, payload: {user_id: string, poll_id: number}) => {
	return state.map((user) => {
		if(user.user_id === payload.user_id) {
			let pollsCreatedIdCopy: Array<number> = user.polls_created_id;
			pollsCreatedIdCopy.push(payload.poll_id);
			return Object.assign({}, user, {polls_created_id: pollsCreatedIdCopy});
		} else {
			return { ...user }
		}
	});
}