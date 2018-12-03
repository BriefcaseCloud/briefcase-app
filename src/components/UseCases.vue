<template>
    <div class="usecasePanel">
        <div class="usecaseHeader">
            <div class="selectedProjectName">
                <div v-if="selectedProject != null">
                    <b>{{projects[selectedProject].title}}</b>
                </div>
                <div v-else>
                    <b>No Project Selected...</b>
                </div>
            </div>
            <div class="addAndShare">
                <div class="addUsecase" v-on:click="promptNewUsecase(selectedProject)">
                    <i class="add fa fa-plus-circle"> </i>
                </div>
                <div class="shareProject" v-on:click="$emit('share-project')">
                    <i class="add fa fa-share"> </i>
                </div>
            </div>
        </div>

        <div class="usecases">
            <ul>
                <li class="usecase" v-for="(data, index) in usecases" :key="index">
                    <div class="usecaseTitle">
                        <div class="usecaseName" v-on:click="(selectedUsecase === index) ? selectedUsecase = null : selectedUsecase = index">
                            {{data.name}}
                        </div>
                        <div class="usecaseIcons">
                            <i class="edit fa fa-minus-circle" v-on:click="removeUsecase(index)"></i>
                        </div>
                    </div>
                    <div class="usecaseDetails" v-if="index === selectedUsecase">
                        <div v-if="data.details == null">
                            Click to add details...
                        </div>
                        <div v-else>
                            {{data.details}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import UserService from '../services/UserService';
    import '../../node_modules/v-slim-dialog/dist/v-slim-dialog.css';
    import SlimDialog from 'v-slim-dialog';

    Vue.use(SlimDialog);


    export default {
        name: 'UseCases',

        props: {
            projects: Array,
            selectedProject: null,
        },

        data() {
            return {
                selectedUsecase: null,
                defaultUsecase: {
                    name: "Test Usecase 1",
                    details: "I <3 UML",
                },


            };
        },

        computed: {
            usecases: function () {
                if (this.selectedProject != null) {
                    return this.projects[this.selectedProject].usecases;
                }
            },
        },

        methods: {

            promptNewUsecase() {
                const options = {title: 'New Project', okLabel: 'Add', size: 'sm', prompt: {invalidMessage: ''}};
                this.$dialogs.prompt('Enter usecase name:', options)
                    .then((res) => {
                        if (res.ok) {
                            this.addNewUsecase(this.selectedProject, res.value)
                        }
                    });
            },

            addNewUsecase(id, name) {
                return UserService.createNewUseCase(this.projects[this.selectedProject].puid)
                .then(res => {
                    var usecase = res.data;
<<<<<<< HEAD
                    usecase.name = 'default';
                    this.saveUsecase(this.usecases.length-1)
                    this.projects[this.selectedProject].usecases.push(usecase)
=======
                    usecase.name = name;
                    usecase.details = null;
>>>>>>> fc2db8c40d0339147f9fdcf362a03c67180156e3
                    this.$emit('create-usecase',usecase)
                    return true
                })
            },

            saveUsecase(id) {
                // console.log(id)
                UserService.updateUseCase(this.projects[this.selectedProject].puid,this.usecases[this.selectedProject].ucid,this.usecases[id])
                .then(res => {
                    if(res.status === 200) {
                        this.$emit('update-usecase',{id: id, usecase: this.usecases[id]})
                        return true
                    }
                })
            },

            removeUsecase(id) {
                // console.log(this.projects[this.selectedProject].puid)
                UserService.deleteUseCase(this.usecases[id].ucid,this.projects[this.selectedProject].puid)
                .then(res => {
                    if(res.status === 200) {
                        this.$emit('delete-usecase',id)
                    }
                });
            },
        },
    };
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    .usecaseHeader {
        padding: 0px;
        border-radius: 10px;
        border: 2px solid #222f3e;
        overflow: hidden;
    }

    .selectedProjectName {
        padding: 20px;
        text-align: left;
        font-size: 1.3em;
        color: black;
        border-radius: 10px;
    }

    .addAndShare {
        display: flex;
        flex-direction: row;
    }

    .usecaseIcons {
        flex-grow: 1;
    }

    .usecaseName {
        flex-grow: 8;
    }

    .usecaseTitle {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid grey;
    }

    .usecase {
        display: flex;
        padding: 10px;
        flex-direction: column;
        margin-bottom: 10px;
        border-radius: 10px;
        text-align: left;
        font-size: 1.1em;
        background-color: lightsteelblue;
        border-bottom: 1px solid #222f3e;
        cursor: pointer;
        color: black;
    }

    .usecases {
        padding-top: 20px;
    }

    .addUsecase {
        flex-grow: 1;
        padding: 10px;
        font-size: 1.3em;
        background-color: lightpink;
        cursor: pointer;
        color: black;
    }

    .shareProject {
        flex-grow: 1;
        padding: 10px;
        font-size: 1.3em;
        background-color: lightblue;
        cursor: pointer;
        color: black;
    }

    .addUsecase:hover {
        background-color: lightcoral;
    }

    .shareProject:hover {
        background-color: lightskyblue;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    input {
        border: 0;
        background-color: transparent;
    }

    input:focus, textarea:focus {
        outline: none;
    }

    i.edit, i.remove {
        float: right;
        padding: 5px;
    }


</style>