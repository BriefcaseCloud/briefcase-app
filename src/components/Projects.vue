<template>
    <div class="flex-container">
        <div class="projectHeader">
            <div class="projects"> Projects </div>
            <div class="addProject" v-on:click="addProject">
                Add
                <i class="fa fa-plus-circle"> </i>
            </div>
        </div>
        <div class = "projectsPanel">


            <div class = "projectListPanel">

                <ul class = "projectList">
                    <li v-for="(data, index) in projects" :key="index">
                        <div class="projectName" v-on:click="selectedIndex = index">
                            {{data.details.title}}
                            <i class="fa fa-times" v-on:click="removeProject(index), selectedIndex = null"> </i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="useCaseListPanel">
                <div v-if="selectedIndex != null">
                    <div class="selectedProjectName">
                        <b>{{projects[selectedIndex].details.title}}</b>: Use Cases
                    </div>
                    <UseCases class="useCaseList"
                            v-bind:key="selectedIndex"
                            v-bind:useCases="projects[selectedIndex].useCases"
                    />
                </div>
                <div v-else>
                    No Project Selected...
                </div>
            </div>
        </div>

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
                selectedIndex: null,
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

            showConfirm() {
                const options = {title: 'Delete Project', okLabel: 'Ok', size: 'sm'};
                this.$dialogs.confirm('Are you sure you want to delete this project?', options)
                    .then((res) => {
                        if (res.ok === true) {
                            return true;
                        }
                        return false;
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
                    console.log(title);
                    var template = res.data.template;
                    template.details.title = title;;
                    template.details.owner = this.user.userId;
                    template.details.users.push({permissions: "edit", user: this.user.userId});
                    this.projects.push(template);
                    return template;
                })
                .then(template => {
                    UserService.createNewProject(template).then(response => {
                        return response.success;
                    })
                })
            },

            removeProject(id) {
                if(this.user.userId === this.projects[id].details.owner) {
                        console.log("tryna delete");
                        console.log(this.projects[id].details.puid);
                        UserService.deleteProject(this.projects[id].details.puid);

                } else {
                    //Not the owner
                }

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

    .projectHeader {
        display: flex;
        background-color: #89c4f4;
        border-bottom: 5px solid slategray;
    }

    .projects {
        flex-grow: 3;
        padding: 20px;
        text-align: left;
        font-size: 1.3em;
    }

    .addProject {
        flex-grow: 1;
        padding: 20px;
        font-size: 1.3em;
        background-color: lightpink;
        cursor: pointer;
        color: black;
    }

    .addProject:hover {
        background-color: lightcoral;
    }


    .projectsPanel {
        display: flex;
        flex-direction: row;
    }

    .useCaseListPanel {
        width: 60%;
    }

    .useCaseList {
        overflow-y: auto;
    }

    .projectListPanel {
        width: 40%;
        border-right: 3px solid darkgray;
    }

    .projectList {
        overflow-y: auto;
        padding: 0px;
        border-left: 5px solid black
    }

    .selectedProjectName {
        padding: 20px;
        text-align: left;
        font-size: 1.3em;
        background-color: steelblue;
        color: black;
    }


    .projectName {
        padding: 20px;
        text-align: left;
        font-size: 1.1em;
        background-color: azure;
        border-bottom: 1px solid lightsteelblue;
        cursor: pointer;
        color: black;
    }

    .projectName:hover {
        background-color: aliceblue;
        border-bottom: 1px solid steelblue;

    }



    ul {
        margin: 0;
        padding-left: 0;
        flex-grow: 1;
        list-style-type: none;
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

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }


    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 50%;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


</style>
