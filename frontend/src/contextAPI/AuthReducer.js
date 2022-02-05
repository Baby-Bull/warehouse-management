const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                token: action.payload,
                error: null
            }
        }
        case "LOGIN_FAILURE": {
            return {
                token: null,
                error: action.payload
            }
        }
        case "LOGOUT" : {
            return {
                token: null,
                error: null
            }
        }
        default:
            return state;
    }
}
export default Reducer;