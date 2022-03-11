const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                token: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS": {
            return {
                token: action.payload,
                isFetching: false,
                error: null
            }
        }
        case "LOGIN_FAILURE": {
            return {
                token: null,
                isFetching: false,
                error: action.payload
            }
        }
        case "LOGOUT": {
            return {
                token: null,
                isFetching: false,
                error: null
            }
        }
        default:
            return state;
    }
}
export default Reducer;