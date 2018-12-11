<template>
    <div>
        <v-select :options='usernames' v-model="selectedUser"></v-select>
        <v-select :options='permissions' v-model="selectedPermission"></v-select>
        <button type="button" v-on:click="addUser()">Add User</button>
        <li v-for="(data, index) in selectedNameList" :key="index">    
            USER: {{data.user}} PERMISSION: {{data.permission}}
        </li>
    
    </div>
</template>
 
<script>
import UserService from '../services/UserService';
import Project from './Projects.vue'

export default {


  props: {
    value: '',
    
    

  },
  data() {
      return {
        users: [],
        usernames: [],
        permissions: ['edit','view'],
        selectedPermission: '',
        selectedUser: '',
        selectedObjectList: [],
        selectedNameList: [],
      }
  },
 
  computed: {
    model: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    isValid() {
    //   return Boolean(String(this.model).trim())
        return true
    },

    getUsers(){
        UserService.fetchUsers()
        .then(res => {
            var users = [];
            var projectUsers;
            res.data.usernames.forEach(user => this.usernames.push(user.username))
            this.users = res.data.usernames
            this.$on('project-users', (projectUsers ) => {
                for(var index in projectUsers){
                    this.users.forEach(newUser => {
                        if(projectUsers[index].user === newUser.uuid){
                            this.users.splice(this.users.indexOf(newUser),1)
                        }
                    })
                }
            })
        })
    },

    addUser() {
        var uuid = ''
        for (var index in this.users) {
            if (this.users[index].username == this.selectedUser){
                uuid = this.users[index].uuid
                this.users.splice(index,1);
                break;
            }
        }
        this.selectedObjectList.push({user: uuid, permissions: this.selectedPermission});
        this.selectedNameList.push({user: this.selectedUser, permission: this.selectedPermission});
        this.selectedPermission = '';
        this.usernames.splice(this.usernames.indexOf(this.selectedUser),1);
        this.selectedUser = '';
        this.model = this.selectedObjectList


    },

  },
  mounted() {
    this.$el.focus()
    this.getUsers();
  }
}
</script> 