<template>
    <div class="hello">
        <AppBar />
    </div>
</template>


<script>
    import {mapActions, mapGetters} from "vuex";
    import AppBar from './AppBar';
    import Button from './features/Button'

    export default {
        name: 'RealtorsTable',
        components: {Button, AppBar},
        computed: {
            ...mapGetters('realtors', {
                    realtors: 'realtorsItems'
                }
            ),
        },
        methods: {
            ...mapActions('realtors', ['fetchRealtors'])
        },
        mounted() {
            this.fetchRealtors();
        },

    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h1 {
        margin: 40px 0;
        display: flex;
        justify-content: center;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .test {
        border: 2px black solid;
        margin: 50px 0;
    }
</style>
