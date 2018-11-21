<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="!user.authenticated" :to="{name: 'home'}">Home</router-link>
            <router-link v-if="user.authenticated" :to="{name:'dashboard'}">Home</router-link> |
            <router-link v-if="!user.authenticated" :to="{name: 'login'}">Login</router-link>
            <router-link v-if="user.authenticated" :to="{name: 'login'}" v-on:click.native="logout()">Logout</router-link>
        </div>

        <!--Displays corresponding route-->
        <router-view :user="user"/>

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
                user: {
                    userId: String,
                    token: Object,
                    authenticated: Boolean,
                }
            };
        },
        created() {
            this.$root.$on('authToken', (authToken) => {
                // captures the user id emited in auth
                this.setUserId(authToken.userId);
                this.setAuthenticated(authToken.token)
            });
        },
        mounted() {
            if (!this.user.token) {
                this.$router.replace({name: 'login'});
            }
        },
        methods: {
            setUserId(userId) {
                // setter for user id and then proceeds to authenticate
                this.user.userId = userId;
            },
            // getUserId() {
            //     return this.userId;
            // },
            setAuthenticated(token) {
                // setter for authenticated
                this.user.token = token;
                this.user.authenticated = true;
            },
            logout() {
                // removes user and resets authenticated status on logout
                this.user.userId = '';
                this.user.token = {};
                this.user.authenticated = false;
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
