<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!authenticated" to="/">Home </router-link>
      <router-link v-if="authenticated" :to="{path: `/user/${userId}/home`}">Home </router-link>
      <router-link v-if="!authenticated" to='/auth/login'>| Login </router-link>
      <router-link v-if="authenticated" to='/auth/login' v-on:click.native="logout()" replace>| Logout </router-link>
    </div>
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
      userId: '',
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
      this.$router.replace({ name: 'login' });
    }
  },
  methods: {
    setUserId(userId) {
      // setter for user id and then proceeds to authenticate
      this.userId = userId;
      this.setAuthenticated(true);
    },
    setAuthenticated(status) {
      // setter for authenticated
      this.authenticated = status;
    },
    logout() {
      // removes user and resets authenticated status on logout
      this.user = '';
      this.authenticated = false;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
