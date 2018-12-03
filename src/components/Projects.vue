<template>
    <div class="flex-container">
        <div class="projectPanel">
            <div class="projectHeader">
                <div class="projects"> Projects
                </div>
                <div class="projectSearch">
                    <input type="text" v-model="search" placeholder="Search projects.."/>
                </div>
            </div>

            <div class="projectListPanel">
                <ul>
                    <li class="projectList" v-for="(data, index) in projects" :key="index">
                        <div class="projectName" v-on:click="selectedIndex = index">
                            {{data.title}}
                            <i class="fa fa-times" v-on:click="removeProject(index)"> </i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="addProject" v-on:click="addProject">
                <i class="add fa fa-plus-circle"> </i>
            </div>
        </div>

        <div class="usecaseListPanel">
            <UseCases
                v-on:create-usecase="createUseCase"
                v-on:delete-usecase="removeUseCase"
                v-on:update-usecase="updateUseCase"
                v-on:share-project="shareProject()"
                v-bind:projects="projects"
                v-bind:selectedProject="selectedIndex"
            />
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
            user: {},
        },

        data() {
            return {
                selectedIndex: null,
                projects: [],
                newTitle: String,
                unsavedProjects: [],
                usersToShare: [],
                search: 'Search Projects...'
            };
        },

        mounted() {
            this.getProjects();

        },

        methods: {
            getProjects() {
                UserService.fetchProjects(this.user.userId)
                    .then(res => {
                        var foundProjects = Array.from(res.data.projects);
                        this.projects = foundProjects
                    })
            },

            showConfirm() {
                const options = {title: 'Delete Project', okLabel: 'Ok', size: 'sm'};
                return this.$dialogs.confirm('Are you sure you want to delete this project?', options)
                    .then((res) => {
                        if (res.ok) {
                            return true;
                        }
                        return false;
                    });
            },

            showPrompt() {
                const options = {title: 'New Project', okLabel: 'Add', size: 'sm', prompt: {invalidMessage: ''}};
                this.$dialogs.prompt('Enter project name:', options)
                    .then((res) => {
                        if (res.ok) {
                            this.newProject(res.value)
                        }
                    });
            },

            addProject() {
                this.showPrompt()
            },

            newProject(title) {
                UserService.createNewProject(this.user.userId)
                .then(res => {
                    var project = res.data.project
                    project.title = title
                    project.usecases = []
                    console.log(project)
                    UserService.updateProject(project)
                    .then(res => {
                        if(res.status === 200){
                            this.projects.push(project)
                        }
                    })
                    
                })
            },

            async removeProject(id) {
                if (this.user.userId === this.projects[id].owner) {
                    if (await this.showConfirm()) {
                        return UserService.deleteProject(this.projects[id].puid)
                            .then(res => {
                                if (res.status === 200) {
                                    this.projects.splice(id, 1);
                                    this.selectedIndex = null
                                }
                            });
                    }
                } else {
                    //Not the owner, prompt?
                }
            },

            saveProject(id) {
                return UserService.updateProject(this.projects[id])
                    .then(() => {
                        return true
                    })
            },

            shareProject() {
                alert("share with users");
            },

            shareWithUsers(id) {
                return UserService.shareProject(this.projects[id].details.puid,this.usersToShare)
                    .then(res => {
                        if (res.status === 200) {
                            return true;
                        }
                    })
            },
            removeUseCase(index){
                this.projects[this.selectedIndex].usecases.splice(index,1);
            },
            createUseCase(usecase){
                this.projects[selectedIndex].usecases.push(usecase);
            },
            updateUseCase(usecase,index){
                this.projects[this.selectedIndex].usecases[index] = usecase;
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .projectHeader {
        padding: 0px;
        border-radius: 10px;
        border: 2px solid #222f3e;
        overflow: hidden;
    }

    .projects {
        padding: 20px;
        text-align: left;
        font-size: 1.3em;
        color: #000;
        border-radius: 10px;
    }

    .projectSearch {
        color: black;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
    }

    .addProject {
        font-size: 1.3em;
        background-color: lightpink;
        color: black;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
        border: 2px solid #222f3e;
        cursor: pointer;
        color: black;
    }

    .addProject:hover {
        background-color: lightcoral;
    }



    .projectPanel {
        display: flex;
        flex-direction: column;
        width: 30%;
        padidng: 10px;
        border-radius: 10px;
    }

    .usecaseListPanel {
        width: 65%;
        height: 100%;
    }

    .projectListPanel {
        padding-top: 20px;
    }

    .projectList {
        padding-bottom: 10px;
    }

    .projectName {
        padding: 20px;
        border-radius: 10px;
        text-align: left;
        font-size: 1.1em;
        background-color: #c8d6e5;
        border-bottom: 1px solid #222f3e;
        cursor: pointer;
        color: black;
    }

    .projectName:hover {
        background-color: aliceblue;
        border-bottom: 1px solid #222f3e;

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

    .add {
        float: none;
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
