initialState = {
	loading: false,
}

const loading = (state = initialState, action) => {
	switch (action.type) {
		case 'START':
			return state = true;
		case 'STOP':
			return state = false;
		default:
			return state
	}
}

export default loading
