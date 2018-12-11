<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Select User to Share
            </slot>
          </div>

          <div class="modal-body">
                <v-select :options='usernames' v-model="selectedUser"></v-select>
                <v-select :options='permissions' v-model="selectedPermission"></v-select>
                <button type="button" v-on:click="addUser()">Add User</button>
                <li v-for="(data, index) in selectedNameList" :key="index">    
                    USER: {{data.user}} PERMISSION: {{data.permission}}
                </li>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              
              <button v-on:click="$emit('close',selectedObjectList)">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserService from '../services/UserService';

export default {


  props: {
    currentUsers: {}
    
    

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
  methods: {

    getUsers(){
        UserService.fetchUsers()
        .then(res => {
            var users = [];
            this.users = res.data.usernames
            for(var index in this.currentUsers){
                this.users.forEach(newUser => {
                    if(this.currentUsers[index].user == newUser.uuid){
                        this.users.splice(this.users.indexOf(newUser),1)
                    }
                })
            }
            this.users.forEach(user => this.usernames.push(user.username))
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


    },

  },
  mounted() {
    this.getUsers();
  }
}
</script> 

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>