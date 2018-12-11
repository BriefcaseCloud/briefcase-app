<template>
    <div id="dashboard">
        <div id="username">
            <h1>Signed in as {{user.username}}</h1>
            <Admin v-if="user.isAdmin"/>
        </div>
        <Projects :user="user"/>
    </div>
</template>

<script>
    import Projects from '../components/Projects.vue';
    import Admin from '../components/Admin.vue';

    export default {
        name: 'dashboard',

        components: {
            Projects,
            Admin,
        },

        props: {
            // userId: Number,
            // userName: String,
            user: Object,
        },
    };
</script>

<style>

    #dashboard {
        padding-left: 15%;
        padding-right: 15%;
        /* position: fixed; */
        overflow: auto;
        width: 70%;
    }

    #username {
        text-align: left;
        display: flex;
        flex-direction: row;
    }
</style>
