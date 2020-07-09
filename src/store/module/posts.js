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
    },
    mutations: {
        SET_POSTS_TO_STATE: (state, posts) => {
            state.posts = posts;
        }
    },
    getters: {
        POSTS(state){
            return state.posts;
        }
    }
}