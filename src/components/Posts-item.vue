<template>
    <div class="posts-item">
        <h2>{{post_data.title}}</h2>
        <p>{{post_data.description}}</p>
        <div class="posts-item__details">
            <span class="posts__date">{{str}} назад</span>
            <div class="posts-item__action">
                <b-button
                        v-if="writer && currentUser"
                        @click="editPost"
                        type="is-light">
                    <b-icon
                            icon="file-document-edit-outline"
                            type="is-info"
                            >
                    </b-icon>
                    <span>Изменить</span>
                </b-button>
                <b-button
                        v-if="writer && currentUser"
                        @click="deletePost"
                        type="is-light">
                    <b-icon
                            icon="delete"
                            type="is-info"
                            >
                    </b-icon>
                    <span>Удалить</span>
                </b-button>
                <b-button
                        v-if="reader && currentUser"
                        @click="increaseClaps"
                        type="is-light"
                          >
                    <b-icon
                            type="is-info"
                            pack="fas"
                            icon="sign-language"
                    >
                    </b-icon>
                    <span>{{post_data.claps}}</span>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "Posts-item",
        props:{
            post_data:{
                type: Object,
                default(){
                    return {}
                }
            },
            writer: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            reader: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            currentUser: {
                type:Boolean,
                default(){
                    return false;
                }
            }
        },
        data(){
            return {
                str: ''
            }
        },
        methods:{
            ...mapActions([
                'DELETE_POST'
            ]),
            getNumEnding(iNumber, aEndings){
                let sEnding, i;
                iNumber = iNumber % 100;
                if (iNumber>=11 && iNumber<=19) {
                    sEnding=aEndings[2];
                }
                else {
                    i = iNumber % 10;
                    switch (i)
                    {
                        case (1): sEnding = aEndings[0]; break;
                        case (2):
                        case (3):
                        case (4): sEnding = aEndings[1]; break;
                        default: sEnding = aEndings[2];
                    }
                }
                return sEnding;
            },
            increaseClaps(){
                this.$emit('increaseClaps', this.post_data.id)
            },
            editPost(){
                this.$router.push({ name: 'Edit', params: { id: this.post_data.id } })
            },
            deletePost(){
                this.DELETE_POST(this.post_data.id);
            },
            numberDaysAgo(){
                let currentDate = Date.now();
                let datePost = Date.parse(this.post_data.updateAt);
                let mlInDay=1000*60*60*24;
                let number = Math.trunc((currentDate - datePost)/mlInDay);
                let endWord = [
                    'день',
                    'дня',
                    'дней'
                ];
                let endWordAfterNumber = this.getNumEnding(number, endWord);
                this.str = `${number} ${endWordAfterNumber}`;
            }
        },
        computed:{
            ...mapGetters([
                'POSTS'
            ]),
        },
        mounted() {
            this.numberDaysAgo()
        }
    }
</script>

<style lang="scss">
    .posts-item {
        background-color: white;
        box-shadow: 0 0 5px 5px rgba(0,0,0,0.2);
        padding: 20px;
        margin-bottom: 20px;
        &:nth-last-of-type(1){
            margin-bottom: 0;
        }
        &__details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .posts__date {
                font-size: 14px;
                color: gray;
            }
        }
        &__action {
            display: flex;
            justify-content: flex-start;
            button {
                margin: 0 10px;
            }
        }
    }
</style>