import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    posts: []
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

            if (!res.status) {
                throw new Error("something went wrong");
            }
    
            dispatch(setPosts(res.data));
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const deletePostsById = createAsyncThunk(
    'posts/deletePostsById',
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

            if (!res.status) {
                throw new Error("something went wrong");
            }
    
            dispatch(deletePost(id));
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        }
    },

    extraReducers: {
        [getPosts.fulfilled]: () => console.log(1111),
        [getPosts.pending]: () => console.log(222),
        [getPosts.rejected]:  () => console.log(33333),
        [deletePostsById.fulfilled]: () => console.log(1111),
        [deletePostsById.pending]: () => console.log(222),
        [deletePostsById.rejected]:  () => console.log(33333),
    }
})

export const {setPosts, deletePost} = postSlice.actions;
export default postSlice.reducer;