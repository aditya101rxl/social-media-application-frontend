import React, { createContext, useReducer, useEffect, useState } from 'react'
import GlobalReducer from './GlobalReducer'
import * as api from '../../api'
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack'


const initialState = {
    posts: [],
    user: null,
    current_chunk: 0,
}

export const GlobalContext = createContext(initialState)
const cookies = new Cookies();

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    const { enqueueSnackbar } = useSnackbar()
    const [hasMore, set_hasMore] = useState(true);
    // Actions
    const signin = async (formData, history) => {
        try {
            let variant = 'error'
            const { data } = await api.signin(formData)
            if (data.user != undefined) {
                const token = { token: data.token, username: data.user.username };
                cookies.set('jwt', token, { maxAge: 7 * 60 * 60 });
                dispatch({ type: 'SIGNIN', payload: { data } })
                history.push('/')
                variant = 'success'
            }
            enqueueSnackbar(data.message, {
                variant,
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            console.log(error);
            const message = "something went wrong, try again !";
            enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }

    const signup = async (formData, history) => {
        try {
            let variant = 'error'
            const { data } = await api.signup(formData);
            if (data.user != undefined) {
                const token = { token: data.token, username: data.user.username };
                cookies.set('jwt', token, { maxAge: 7 * 60 * 60 });
                dispatch({ type: 'SIGNUP', payload: { data } })
                history.push('/')
                variant = 'success'
            }
            enqueueSnackbar(data.message, {
                variant,
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            console.log(error);
            const message = "something went wrong, try again !";
            enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }

    const logout = () => {
        alert(`You're logging out`);
        cookies.remove('jwt');
        dispatch({ type: 'LOGOUT', payload: null })
        // window.location.reload();
    }

    const createPost = async (formData, history) => {
        try {
            const { data } = await api.createPost(formData);
            // console.log(data);
            dispatch({ type: 'CREATE', payload: data })
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            const { data } = await api.getPosts(state.current_chunk);
            dispatch({ type: 'FETCH', payload: data });
            // console.log(data);
            if(data.length===0) set_hasMore(false);
        } catch (error) {
            console.log(error);
        }
    }

    const like = ({ data, id, user }) => {
        api.like({ _id: id, username: user, islike: true });
        dispatch({ type: 'LIKE', payload: { id, data } })
    }

    const dislike = ({ data, id, user }) => {
        api.like({ _id: id, username: user, islike: false });
        dispatch({ type: 'DISLIKE', payload: { id, data } })
    }

    const commentPost = ({ data, comment, id }) => {
        api.comment({ _id: id, comment, user: state.user?.username });
        dispatch({ type: 'COMMENT', payload: { id, data } });
    }

    const deletePost = ({ _id }) => {
        api.deletePost(_id).then(({ data }) => {
            // console.log(data);
        })
        dispatch({ type: 'DELETEPOST', payload: _id });
    }

    const editUser = (data) => {
        const updatedUser = { user: data };
        dispatch({ type: 'USER', payload: updatedUser });
    }

    const clearNotice = () => {
        api.clearNotice(state?.user?.username);
        dispatch({ type: 'CLEAR', payload: 0 })
    }

    useEffect(async () => {
        getPosts();
        const username = cookies.get('jwt')?.username
        if (username != undefined) {
            const result = await api.findUser(username);
            // console.log(result.data.user);
            dispatch({ type: 'USER', payload: { user: result.data.user } });
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            posts: state.posts,
            user: state.user,
            hasMore,
            signin,
            signup,
            logout,
            createPost,
            getPosts,
            like,
            dislike,
            commentPost,
            deletePost,
            editUser,
            clearNotice,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

