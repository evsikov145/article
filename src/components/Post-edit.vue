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
                        @click="editDataPost"
                        type="is-primary"
                        expanded
                >Сохранить</b-button>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "Post-edit",
        data(){
            return{
                id: '',
                title:'',
                description: ''
            }
        },
        methods: {
            ...mapActions([
               'EDIT_POST'
            ]),
            getInfo(){
                this.id = this.$route.params.id;
                let currentPost = this.POSTS.find(post => post.id === this.id);
                this.title = currentPost.title;
                this.description = currentPost.description;
            },
            editDataPost(){
                let updateAt = new Date();
                updateAt = updateAt.toISOString();
                let data = {
                    title: this.title,
                    description: this.description,
                    id: this.id,
                    updateAt: updateAt
                };
                this.EDIT_POST(data)
                    .then(() => {
                        this.$router.push('/')
                    })
            }

        },
        computed: {
            ...mapGetters([
                'POSTS'
            ])
        },
        mounted(){
            this.getInfo();
        }
    }

</script>
