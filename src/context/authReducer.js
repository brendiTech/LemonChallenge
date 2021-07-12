export const AuthReducer = (state, action) => {

    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated',
                token: action.payload.token,
                errorMessage: ''
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: ''
            }

        default:
            return state;
    }

}