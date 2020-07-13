<template>
    <section class="section auth is-large">
        <div
                v-if="successAuth"
                class="container"
        >
            <h1 class="title">Авторизация пройдена!</h1>
        </div>
        <div
               v-else
                class="container"
        >
            <h1 class="title">Авторизация</h1>
            <b-field
                    label="Username"
                    :type="loginType"
                    :message=loginErrorMessage
            >
                <b-input v-model="login" maxlength="30"></b-input>
            </b-field>
            <b-field
                    label="Password"
                    :type="passwordType"
                    :message=passwordErrorMessage
            >
                <b-input v-model="password" type="password" maxlength="30"></b-input>
            </b-field>
            <b-button
                    @click="auth"
                    type="is-primary"
                    expanded
            >Войти</b-button>
        </div>
    </section>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'

    export default {
        name: "Auth",
        data(){
          return{
              login: 'writer@mail.com',
              password: '123456',
              loginErrorMessage: '',
              passwordErrorMessage: '',
              loginType: '',
              passwordType: '',
              successAuth: false,
          }
        },
        methods: {
            ...mapActions([
                'GET_CURRENT_USER',
                'GET_USER_FROM_API'
            ]),
            auth(){
                let validLogin = this.validateLogin(this.login);
                let validPassword = this.validatePassword(this.password);
                if(validLogin && validPassword){
                    let currentUser = this.USERS.find(user => user.login === validLogin);
                    if(currentUser){
                        if(currentUser.password === +validPassword){
                            this.successAuth = true;
                            localStorage.setItem('user_id', currentUser.id);
                        }else {
                            this.passwordErrorMessage = 'Неверный пароль! Попробуйте ещё раз!';
                            this.passwordType = 'is-danger';
                            this.password = '';
                        }
                    }else {
                        this.loginErrorMessage = 'Такого пользователя не существует!';
                        this.loginType = 'is-danger';
                        this.passwordType = 'is-danger';
                        this.password = '';
                    }

                }
            },
            validateLogin(login){

                this.loginErrorMessage = '';

                let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if(login.trim().length < 3){
                    this.loginErrorMessage = 'Логин не может быть меньше 3 символов!';
                    this.loginType = 'is-danger';
                }else if(!reg.test(login.trim())){
                    this.loginErrorMessage = 'Введён не валидный логин ( email )!';
                    this.loginType = 'is-danger';
                }

                if(!this.loginErrorMessage){
                    this.loginType = 'is-success';
                    return login;
                }
            },
            validatePassword(password){

                this.passwordErrorMessage = '';

                if(password.trim().length < 3){
                    this.passwordErrorMessage = 'Пароль не может быть меньше 3 символов!';
                    this.passwordType = 'is-danger';
                }

                if(!this.passwordErrorMessage){
                    this.passwordType = 'is-success';
                    return password;
                }
            },
        },
        computed: {
            ...mapGetters([
                'USERS'
            ])
        },
        watch: {
            successAuth: function () {
                setTimeout(() => {
                    this.$router.push({name: 'Posts'});
                }, 2000)
            }
        },
        mounted() {
            this.GET_USER_FROM_API()
        }
    }
</script>

<style lang="scss">
    .container {
        background-color: white;
        padding: 40px;
        box-shadow: 0 0 5px 5px rgba(0,0,0, 0.2);
        max-width: 600px;
    }
</style>