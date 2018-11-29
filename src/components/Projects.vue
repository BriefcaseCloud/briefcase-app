<template>
    <div class="flex-container">
        <div class="addProject" v-on:click="addProject">
            Add Project
            <i class="fa fa-plus-circle"> </i>
        </div>
        <ul>
            <li v-for="(data, index) in projects" :key="index">
                <div class="projectName" v-on:click="selectedIndex = index">
                    {{data.details.title}}
                    <i class="fa fa-times" v-on:click="removeProject(index), selectedIndex = ''"> </i>
                </div>
                <div class="list" v-if="index == selectedIndex">
                    <UseCases
                            v-bind:key="index"
                            v-bind:usecases="data.usecases"
                    />
                </div>


            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import UseCases from './UseCases.vue';
    import '../../node_modules/v-slim-dialog/dist/v-slim-dialog.css';
    import SlimDialog from 'v-slim-dialog';
    import UserService from '../services/UserService';

    Vue.use(SlimDialog);

    export default {
        name: 'Projects',
        components: {
            UseCases,
            SlimDialog,
        },
        props: {
            user:{},
        },

        data() {
            return {
                selectedIndex: String,
                projects: [],
                newTitle: String,
            };
        },

        mounted() {
            this.getProjects();
        },

        methods: {

            async getProjects() {
                var params = {uuid: this.user.userId}
                const response = await UserService.fetchProjects(params);
                var foundProjects = Array.from(response.data.projects);
                this.projects = foundProjects
            },

            showConfirm(id) {
                const options = {title: 'Delete Project', okLabel: 'Ok', size: 'sm'};
                this.$dialogs.confirm('Are you sure you want to delete this project?', options)
                    .then((res) => {
                        if (res.ok === true) {
                            this.projects.splice(id, 1);
                        }
                    });
            },
            showPrompt() {
                const options = {title: 'New Project', okLabel: 'Add', size: 'sm', prompt: {invalidMessage: ''}};
                this.$dialogs.prompt('Enter project name:', options)
                    .then((res) => {
                        if (res.ok === true) {
                            this.newProject(res.value)
                                
                        
                        }
                    });
            },

            addProject() {
                this.showPrompt()
            },
            newProject(title) {
                UserService.getNewTemplate()
                .then(res => {
                    console.log(title)
                    var template = res.data.template
                    template.details.title = title
                    template.details.owner = this.user.userId
                    template.details.users.push({permissions: "edit", user: this.user.userId})
                    this.projects.push(template)
                    return template
                })
                .then(template => {
                    UserService.createNewProject(template).then(response => {
                        return response.success
                    })
                })
                
            },

            removeProject(id) {
                this.showConfirm(id);
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    .flex-container {
        box-shadow: 0 0 10px gray;
        background: lightcyan;
    }

    ul {
        margin: 0;
        padding-left: 0;
        padding-top: 20px;
        flex-grow: 1;
        list-style-type: none;
    }

    ul li {
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .projectName {
        text-align: left;
        padding: 20px;
        font-size: 1.3em;
        background-color: azure;
        border-bottom: 5px solid lightsteelblue;
        cursor: pointer;
        color: black;
    }

    .projectName:hover {
        background-color: aliceblue;
        border-bottom: 5px solid steelblue;

    }

    .addProject {
        padding: 20px;
        font-size: 1.3em;
        background-color: lightpink;
        border-bottom: 5px solid slategray;
        cursor: pointer;
        color: black;
    }

    .addProject:hover {
        background-color: lightcoral;
        border-bottom: 5px solid black;
    }

    p {
        text-align: center;
        padding: 30px 0;
        color: #000;
    }

    a {
        color: #42b983;
    }

    i {
        float: right;
    }


</style>
