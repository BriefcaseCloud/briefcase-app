<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="!authenticated" :to="{name: 'home'}">Home</router-link>
            <router-link v-if="authenticated" :to="{name:'dashboard'}">Home</router-link> |
            <router-link v-if="!authenticated" :to="{name: 'login'}">Login</router-link>
            <router-link v-if="authenticated" :to="{name: 'login'}" v-on:click.native="logout()">Logout</router-link>
        </div>

        <!--Displays corresponding route-->
        <router-view/>

    </div>
</template>

<script>
    import Auth from './components/Auth.vue';

    export default {
        name: 'app',
        components: {
            Auth,
        },
        data() {
            return {
                authenticated: false,
                userId: String,
            };
        },
        created() {
            this.$root.$on('userId', (user) => {
                // captures the user id emited in auth
                this.setUserId(user);
            });
        },
        mounted() {
            if (!this.authenticated) {
                this.$router.replace({name: 'login'});
            }
        },
        methods: {
            setUserId(userId) {
                // setter for user id and then proceeds to authenticate
                this.userId = userId;
                this.setAuthenticated(true);
            },
            getUserId() {
                return this.userId;
            },
            setAuthenticated(status) {
                // setter for authenticated
                this.authenticated = status;
            },
            logout() {
                // removes user and resets authenticated status on logout
                this.userId = '';
                this.authenticated = false;
            },
        },
    };
</script>

<style>

    @import url('https://fonts.googleapis.com/css?family=Roboto');

    #app {
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        justify-items: center;
        align-items: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

</style>
