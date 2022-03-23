export default (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                current_chunk: state.current_chunk+1
            }
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts] }
        case 'SIGNIN':
        case 'SIGNUP':
            return {
                ...state,
                user: { ...action.payload.data.user },
            }
        case 'LOGOUT':
            return { ...state, user: action.payload }
        case 'USER':
            return {
                ...state,
                user: action.payload.user ,
            }
        case 'LIKE':
        case 'DISLIKE':
            return {
                ...state, posts: state.posts.map(post =>
                    post._id === action.payload.id ? (
                        { ...post, likes: action.payload.data }
                    ) : post)
            }
        case 'COMMENT':
            return {
                ...state, posts: state.posts.map(post =>
                    post._id === action.payload.id ? (
                        { ...post, comments: action.payload.data }
                    ) : post)
            }
        case 'DELETEPOST':
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
        case 'CLEAR':
            return {
                ...state,
                user: { ...state.user, notificationCount: action.payload }
            }
        default:
            return state;
    }
}