<template>
    <section class="posts">
        <PostsItem
            v-for="post in postForPagination"
            :key="post.id"
            :post_data="post"
            @increaseClaps="increaseClaps"
            @editPost="editPost"
            :writer="writerOption"
            :reader="readerOption"
            :currentUser="currentUser"
        />
        <div class="buttons">
            <b-button
                    v-if="writerOption && currentUser"
                    @click="addNewPost"
                    type="is-primary"
                    expanded
            >Создать новый пост</b-button>
        </div>
        <b-pagination
                v-if="showPaginate"
                :total="total"
                :current.sync="current"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
        </b-pagination>
    </section>
</template>

<script>
    import PostsItem from './Posts-item'
    import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "List",
        data(){
            return{
                writerOption: false,
                readerOption: false,
                current: 1,
                perPage: 10,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                showPaginate: false
            }
        },
        components: {
            PostsItem
        },
        computed:{
            ...mapGetters([
                'POSTS',
                'CURRENT_USER'
            ]),
            currentUser(){
                return this.$store.state.user.currentUserBool;
            },
            postForPagination(){
                let page_number = this.current-1;
                return this.POSTS.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
            },
            total() {
                let total = this.POSTS.length;
                if(total> 10) {
                    this.showPaginate = true;
                }else {
                    this.current = 1;
                    this.showPaginate = false;
                }
                return total;
            }
        },
        methods: {
            ...mapActions([
                'GET_POSTS_FROM_API',
                'GET_USER_FROM_API',
                'GET_CURRENT_USER',
                'INCREASE_COUNT_CLAPS',
                'EDIT_POST'
            ]),
            increaseClaps(id){
                this.INCREASE_COUNT_CLAPS(id);
            },
            editPost(id){
                this.EDIT_POST(id);
            },
            addNewPost(){
                this.$router.push({ name: 'Add' });
            },
            showAdditionalItems(){
                let role = this.CURRENT_USER.role;
                if(role === 'writer'){
                    this.writerOption = true;
                }else if(role === 'reader'){
                    this.readerOption = true;
                    this.writerOption = false;
                }
            },
        },
        mounted() {
            this.GET_POSTS_FROM_API();
            this.GET_USER_FROM_API()
            .then(() => {
                this.GET_CURRENT_USER();
                this.showAdditionalItems();
            });
        },
        watch: {
            total: function(){
                this.postForPagination;
            }
        }
    }
</script>

<style lang="scss">
    .posts {
        max-width: 600px;
        margin: 40px auto;
    }
</style>