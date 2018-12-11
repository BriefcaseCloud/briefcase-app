<template>
    <div>
        <v-select :options='usernames' v-model="selectedUser"></v-select>
        <button type="button" v-on:click="deleteUser()">Delete User</button>
        <p>Add new user:</p>
        <div class="inputContainer">
            <textarea-autosize
                    class="input"
                    v-model="newUserName"
                    :min-height="15"
                    :max-height="30"/>
        </div>
        <button type="button" v-on:click="addUser()">Add User</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../../node_modules/v-slim-dialog/dist/v-slim-dialog.css';
    import SlimDialog from 'v-slim-dialog';
    Vue.use(SlimDialog);
    import VueTextareaAutosize from 'vue-textarea-autosize'
    Vue.use(VueTextareaAutosize);

    import UserService from '../services/UserService';

    export default {
        name: "AddDeleteUsers",

        props: {
            value: '',
        },

        data() {
            return {
                users: [],
                usernames: [],
                selectedUser: '',
                newUserName: '',
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

        methods : {

            isValid() {
                //   return Boolean(String(this.model).trim())
                return true
            },

            deleteUser() {
                this.usernames.splice(this.usernames.indexOf(this.selectedUser),1);
                this.model = this.selectedUser;
                this.selectedUser = '';
            },

            addUser() {
                this.usernames.push(this.newUserName);
                this.model = this.newUserName;
                this.newUserName = '';
            },

            getUsers(){
                UserService.fetchUsers()
                    .then(res => {
                        var users = [];
                        var projectUsers;
                        res.data.usernames.forEach(user => this.usernames.push(user.username))
                        this.users = res.data.usernames;
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
        },



        mounted() {
            this.$el.focus();
            this.getUsers();
        }
    }

</script>
<style scoped>

</style>