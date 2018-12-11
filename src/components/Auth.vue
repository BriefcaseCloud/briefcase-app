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
      users: [], //user list
      selected: '', // selected user
    };
  },

  created() {
      this.getUsers();
  },

  methods: {
    async getUsers() {

        const response = await UserService.fetchUsers();
   
        const userList = response.data.usernames;
        for(var user in userList) {
            this.users.push(userList[user].username)
        }
    },
    async login() {
        const response = await UserService.fetchAuthToken(this.selected);
        if (response) {
            var user = {};
            user.token = response.data.token;
            user.username = this.selected;
            user.userId = response.data.id;
            // console.log(response.data.isAdmin)
            user.isAdmin = response.data.isAdmin;
            this.$root.$emit('authToken', user); // emits the user id to the parent app to set the current user
            this.$router.replace({ path: `/user/${user.userId}/dashboard` }); // reroutes to user home page
        } else {
           // console.error('A valid username is required');
      }
    },
  },
};
</script>

<style scoped>
</style>
