export const CommentReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'COMMENTS_LOAD_SUCCESS':
            return {
                ...state,
                comments: payload,
            }
        case 'COMMENTS_LOAD_FAIL':
            return {
                ...state,
                comments: [],
            }

        default:
            return state
    }
}