import axios from "axios";

export default {
    state:{
        posts: []
    },
    actions: {
        GET_POSTS_FROM_API({commit}) {
            return axios('http://localhost:3000/posts', {
                method: "GET"
            })
                .then((posts) => {
                    commit('SET_POSTS_TO_STATE', posts.data);
                    return posts;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        INCREASE_COUNT_CLAPS({commit}, id){
            commit('SET_COUNT_CLAPS', id);
        },
        EDIT_POST({commit}, data){
            return axios.patch(`http://localhost:3000/posts/${data.id}`, {
                title: data.title,
                description: data.description,
                updateAt: data.updateAt
            })
                .then((response) => {
                    commit('SET_EDIT_POST', response.data);
                    return data;
                })
                .catch((error) => {
                    return error;
                })

        },
        DELETE_POST({commit}, id){
            return axios.delete(`http://localhost:3000/posts/${id}`)
                .then((id) => {
                    commit('SET_DELETE_POST', id);
                })
                .catch((error) => {
                    return error;
                })
        },
        ADD_POST({commit}, data){
            return axios.post(`http://localhost:3000/posts/`, {
                id: data.id,
                title: data.title,
                description: data.description,
                claps: data.claps,
                createdAt: data.updateAt,
                updateAt: data.updateAt,
                userId: data.userId
            })
                .then((response) => {
                    commit('SET_ADD_POST', response.data);
                    return data;
                })
                .catch((error) => {
                    return error;
                })
        }
    },
    mutations: {
        SET_POSTS_TO_STATE: (state, posts) => {
            state.posts = posts;
        },
        SET_COUNT_CLAPS: (state, id) => {
            let post = state.posts.find(post => post.id === id);
            let count = ++post.claps;
            return axios.patch(`http://localhost:3000/posts/${id}`, {
                claps: count,
            })
        },
        SET_DELETE_POST: (state, id) => {
            let index = state.posts.findIndex(post => post.id === id);
            state.posts.splice(index, 1)
        },
        SET_EDIT_POST: (state, data) => {
            const currentPost = state.posts.find(item => item.id === data.id);
            currentPost.title = data.title;
            currentPost.description = data.description;
            currentPost.updateAt = data.updateAt;
        },
        SET_ADD_POST: (state, data) => {
            const newPost = {
                id: data.id,
                title: data.title,
                description: data.description,
                claps: data.claps,
                createdAt: data.updateAt,
                updateAt: data.updateAt,
                userId: data.userId
            };
            state.posts.push(newPost);
        }
    },
    getters: {
        POSTS(state){
            return state.posts;
        }
    }
}