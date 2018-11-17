<template>
    <div id="dashboard">
        <div id="username">
            Signed in as {{this.userName}}
        </div>
        <Projects/>
    </div>
</template>

<script>
    import Projects from '../components/Projects.vue';


    export default {
        name: 'dashboard',

        components: {
            Projects,
        },

        props: {
            userId: Number,
            userName: String,
        },
    };
</script>

<style>

    #dashboard {
        padding-left: 15%;
        padding-right: 15%;
        position: fixed;
        width: 70%;
    }

    #username {
        text-align: left;
        padding-bottom: 10%;
    }
</style>
