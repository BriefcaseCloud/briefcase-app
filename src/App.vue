<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="user.authenticated" :to="{name: 'login'}" v-on:click.native="logout()">
                <div class="logout">
                    Logout
                </div>
            </router-link>
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
                    username: String,
                    token: Object,
                    isAdmin: Boolean,
                }
            };
        },
        created() {
            this.$router.replace({name: 'login'});
            this.$root.$on('authToken', (authToken) => {
                this.setAdmin(authToken);
                this.setUserId(authToken);
                this.setAuthenticated(authToken.token);
            });
        },
        watch: {
            $route(before,after){
                if (!this.user.authenticated) {
                this.$router.replace({name: 'login'});
                }
            },
            
        },

        methods: {
            setUserId(authToken) {
                // setter for user id and then proceeds to authenticate
                this.user.userId = authToken.userId;
                this.user.username = authToken.username;
            },
            // getUserId() {
            //     return this.userId;
            // },
            setAuthenticated(token) {
                // setter for authenticated
                this.user.token = token;
                this.user.authenticated = true;
            },

            setAdmin(authToken) {
                this.user.isAdmin = authToken.isAdmin;
            },

            logout() {
                // removes user and resets authenticated status on logout
                this.user.userId = '';
                this.user.username = '';
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

    a {
        text-decoration: none;
    }

    .logout {
        display: flex;
        justify-content: center;
        padding: 20px;
        border-radius: 10px;
        width: 5%;
        text-align: left;
        font-size: 1.1em;
        border: 1px solid #222f3e;
        cursor: pointer;
        color: black;
        background-color: lightpink;
    }

</style>
