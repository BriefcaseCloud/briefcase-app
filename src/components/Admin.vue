<template>
    <div>
        <button v-on:click="manageUsers()">Manage Users</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import UseCases from './UseCases.vue';
    import AddDeleteUsers from './AddDeleteUsers.vue'
    import '../../node_modules/v-slim-dialog/dist/v-slim-dialog.css';
    import SlimDialog from 'v-slim-dialog';

    Vue.use(SlimDialog);
    export default {
        name: "Admin",

        components: {
            UseCases,
            SlimDialog,
        },

        methods: {
            manageUsers() {
                const options = {title: 'Manage Users', okLabel: 'Save', size: 'lg', prompt: {invalidMessage: '', component: AddDeleteUsers}};
                this.$dialogs.prompt('Delete User:', options)
                    .then((res) => {
                        if (res.ok) {
                            var users = res.value;
                            console.log(users[0].user);
                        }
                    });
            }

        }
    }
</script>

<style scoped>

    button, input[type="submit"], input[type="reset"] {
        background: lightpink;
        color: black;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px 30px;
        margin: 20px;
        float: right;
        font: inherit;
        cursor: pointer;
        outline: none;
    }

</style>