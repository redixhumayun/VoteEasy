import { User } from '../models/user.model';
import { reducer } from './users';

import * as actionImports from '../actions/users';

describe('user reducer logic', () => {

	it('will load the initial set of users', () => {
		const initialState: Array<User> = [];

		const users: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}
		];

		const action: actionImports.ActionInterface = new actionImports.GetUsersAction(
				{ users }
			);

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual(users);
	});

	it('will create a new user and add it to the array', () => {
		const initialState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}
		];

		const newUser: User = {
			userName: 'new_user', 
			user_id: '225', 
			isLoggedIn: false, 
			polls_created_id: []
		};

		const expectedState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}, 
			{
				userName: 'new_user', 
				user_id: '225', 
				isLoggedIn: false, 
				polls_created_id: []
			}
		]

		const action: actionImports.ActionInterface = new actionImports.AddUserAction(
			newUser
		)

		const nextState = reducer(initialState, action);
		expect(nextState).toEqual(expectedState);
	});

	it('will switch the isLoggedIn boolean on logging in and logging out', () => {
		const initialState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}
		];

		const action: actionImports.ActionInterface = new actionImports.SwitchLogInStatusAction(
			{ user_id: '123' }
		);

		const nextState = reducer(initialState, action);

		const expectedState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: true, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}
		];

		expect(nextState).toEqual(expectedState);
	});

	it('will add new poll id when user creates poll', () => {
		const initialState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35]
			}
		];

		const action: actionImports.ActionInterface = new actionImports.AddPollAction(
			{ 
				user_id: '354', 
				poll_id: 252
			}
		);

		const nextState = reducer(initialState, action);

		const expectedState: Array<User> = [
			{
				userName: 'redixhumayun', 
				user_id: '123', 
				isLoggedIn: false, 
				polls_created_id: [123, 456, 7789]
			}, 
			{
				userName: 'random', 
				user_id: '354', 
				isLoggedIn: true, 
				polls_created_id: [22, 2, 35, 252]
			}
		]

		expect(nextState).toEqual(expectedState);
	});	
});