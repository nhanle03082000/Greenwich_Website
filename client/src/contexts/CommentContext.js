import React, { useReducer, createContext } from "react"
import { CommentReducer } from '../reducers/CommentReducer';
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';


export const CommentContext = createContext()
const CommentContextProvider = ({ children }) => {
    const [CommentState, dispatch] = useReducer(CommentReducer, {
        Comments: [],
        Comment: '',
        Comments_by_user: []
    })

    //Get all comments
    const getAllComments = async () => {
        try {
            const response = await axios.get(`${apiUrl}/comments`)
            if (response.data) {
                console.log("data luu payload", response.data)
                dispatch({ type: 'COMMENTS_LOAD_SUCCESS', payload: response.data })
            }
        } catch (error) {
            dispatch({ type: 'COMMENTS_LOAD_FAIL' })
        }
    }

    //add a new Comment
    const addNewComment = async (comment, id) => {
        try {
            let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            console.log("comment:", comment)
            const response = await axios.post(`${apiUrl}/blogs/` + id + `/comments/create`, { comment }, {

                headers: {
                    "Authorization": token
                }
            })
            console.log("data a new Comment", response.data)
            return response.data
        } catch (error) {
            console.log('error', error)
        }
    }

    //get a Comment by category id
    const getCommentByCateId = async (_id) => {
        const response = await axios.get(`${apiUrl}`)
        console.log("Comment by cate: ", response)
    }

    const DeleteComment = async (_id) => {
        let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        const response = await axios.delete(`${apiUrl}/comments/` + _id + `/delete`, {

            headers: {
                "Authorization": token
            }
        })
        console.log("delete comment: ", response.data)
        return response.data
    }

    const CommentContextData = { CommentState, getAllComments, addNewComment, getCommentByCateId, DeleteComment }

    return (
        <CommentContext.Provider value={CommentContextData} >
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider