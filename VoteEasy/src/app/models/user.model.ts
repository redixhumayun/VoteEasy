import { Poll } from './poll.model';

export interface User {
	userName: string, 
	user_id: string, 
	isLoggedIn: boolean, 
	polls_created_id: Array<number>
}