<template>
    <div id="dashboard">
        <div id="username">
            Signed in as {{$route.params.userId}}
        </div>
        <Projects/>
    </div>
</template>

<script>
    import Projects from '../components/Projects.vue'

    export default {
        name: 'dashboard',
        components: {
            Projects,
        },
        props: {
            userId: String,
        }
    }
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
