let user = {}

if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'))
}

const initialState = {
    userLogin : user
}

const UserLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        return {
            ...state,
            userLogin: action.user
        }
        default: return state
    }
}

export default UserLoginReducer