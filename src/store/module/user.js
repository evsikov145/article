import axios from "axios";

export default {
    state:{
        users: [],
        currentUser: {},
        currentUserBool: false
    },
    actions: {
        GET_USER_FROM_API({commit}) {
            return axios('http://localhost:3000/users', {
                method: "GET"
            })
                .then((users) => {
                    commit('SET_USERS_TO_STATE', users.data);
                    return users;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_CURRENT_USER({commit}){
            commit('SET_CURRENT_USER');
        }
    },
    mutations: {
        SET_USERS_TO_STATE: (state, users) => {
            state.users = users;
        },
        SET_CURRENT_USER: (state) => {
            let currentUserId = localStorage.getItem('user_id');
            if(!currentUserId){
                state.currentUserBool = false;
                state.currentUser = {}
            }else {
                state.currentUserBool = true;
                state.currentUser = state.users.find(user => user.id === +currentUserId );
            }

        }
    },
    getters: {
        USERS(state){
            return state.users;
        },
        CURRENT_USER(state){
            return state.currentUser;
        }
    }
}