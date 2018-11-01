<template>
    <div id="login">
        <h1>Login</h1>
        <p>Select a User</p>
        <v-select :options='users' v-model="selected"></v-select> 
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
export default {
  name: 'Auth',
  data() {
    return {
      users: [],
      selected: '', // selected user
    };
  },
  created () {
      this.getUsers();
  },

  methods: {
    async getUsers() {
        var response = await UserService.fetchUsers();
        this.users = response.data;
    },
    async login() {
        var response = await UserService.fetchAuthToken({user: this.selected});
        
        if (response) {
            this.$root.$emit('userId', this.selected); // emits the user id to the parent app to set the current user
            this.$router.replace({ path: `/user/${this.selected}/home` }); // rerodutes to user home page
        } else {
            console.error('A valid username is required');
      }
    },
  },
};
</script>

<style scoped>
</style>
