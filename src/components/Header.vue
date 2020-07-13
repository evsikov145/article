<template>
    <header class="header">
        <a
                v-if="checkUser"
                href="#"
                @click.prevent="exitUser()"
        >Выйти</a>
        <router-link
                v-else
                to="Auth"
        >Авторизация</router-link>

    </header>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "Header",
        methods: {
            ...mapActions([
                'GET_CURRENT_USER'
            ]),
            exitUser(){
                localStorage.removeItem('user_id');
                this.GET_CURRENT_USER();
            },
        },
        computed:{
            checkUser(){
                return this.$store.state.user.currentUserBool;
            }
        },
    }
</script>

<style lang="scss">
    .header {
        background-color: royalblue;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20px;
        min-height: 60px;
        a {
            color: white;
        }
    }
</style>