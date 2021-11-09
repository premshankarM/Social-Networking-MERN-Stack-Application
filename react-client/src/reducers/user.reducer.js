export const initiallState = null;

export const userReducer = (currentstate,action) =>{
    switch (action.type) {
        case 'user':
            return action.payload;
            break;
        case 'clear':
            return null;
            break;
        default:
            return currentstate;
            break;
    }
}