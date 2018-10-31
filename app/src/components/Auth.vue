<template>
    <div id="login">
        <h1>Login</h1>
        <p>Select a User</p>
        <v-select :options='users' v-model="selected"></v-select> 
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      users: [
        // Temp list of users, will need to add a call to the api and add users to db
        { label: 'Bob' },
        { label: 'jimbo' },
      ],
      selected: { label: '' }, // selected user
    };
  },

  methods: {
    login() {
      if (this.selected.label !== '') {
        this.$root.$emit('userId', this.selected.label); // emits the user id to the parent app to set the current user
        this.$router.replace({ path: `/user/${this.selected.label}/home` }); // reroutes to user home page
      } else {
        console.error('A username and password must be present');
      }
    },
  },
};
</script>

<style scoped>
</style>
