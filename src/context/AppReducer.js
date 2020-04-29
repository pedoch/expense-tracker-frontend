export default (state, action) => {
	switch (action.type) {
		case 'DELETE_TRANSACTION':
			return {
				...state,
				user: {
					...state.user,
					transactions: action.payload,
				},
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				user: {
					...state.user,
					transactions: action.payload,
				},
			};
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
