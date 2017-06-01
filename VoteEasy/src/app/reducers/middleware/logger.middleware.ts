const INIT = '__NOT_A_REAL_ACTION__';

export const logger = reducer => {
	let initialState = reducer(undefined, { type: INIT });

	return function(state, action) {
		console.log(action);

		let nextState = reducer(state, action);
		return nextState;
	}
}