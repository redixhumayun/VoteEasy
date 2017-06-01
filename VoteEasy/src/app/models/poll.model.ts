export interface Poll {
	poll_title: string, 
	poll_id: number, 
	options: Array<{name: string, votes: number}>, 
	voter_ids: Array<number>, 
	createdBy: string
}