<template>
    <section class="section is-large posts">
        <div class="container">
            <b-field label="Title">
                <b-input v-model="title"></b-input>
            </b-field>
            <b-field label="Message">
                <b-input v-model="description" maxlength="200" type="textarea"></b-input>
            </b-field>
            <div class="buttons">
                <b-button
                        @click="addNewPost"
                        type="is-primary"
                        expanded
                >Сохранить</b-button>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "Post-add",
        data(){
            return {
                title:'',
                description: ''
            }
        },
        methods: {
            ...mapActions([
                'ADD_POST'
            ]),
            addNewPost(){
                let updateAt = new Date();
                updateAt = updateAt.toISOString();
                let idArray = [];
                this.POSTS.forEach(item => {
                    idArray.push(item.id)
                });
                idArray.sort((a,b) => a - b);
                let id = ++(idArray[idArray.length-1]);
                let data = {
                    title: this.title,
                    description: this.description,
                    id: id,
                    updateAt: updateAt,
                    createdAt: updateAt,
                    userId: this.CURRENT_USER.id,
                    claps: 0
                };

                this.ADD_POST(data)
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        },
        computed:{
            ...mapGetters([
                'POSTS',
                'CURRENT_USER'
            ])
        },
    }
</script>

<style scoped>

</style>