const loading = (state, action) => {
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
