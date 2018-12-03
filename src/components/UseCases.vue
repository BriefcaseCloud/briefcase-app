<template>
    <div class="usecasePanel">
        <div class = "usecaseHeader">
            <div class="selectedProjectName">
                <div v-if="selectedProject != null">
                    <b>{{projects[selectedProject].details.title}}</b>
                </div>
                <div v-else>
                    <b>No Project Selected...</b>
                </div>
            </div>
            <div class = "addUsecase" v-on:click="addUsecase()">
                <i class="add fa fa-plus-circle"> </i>
            </div>
        </div>

        <div v-if="selectedProject != null" class="usecases">
            <ul>
                <li v-for="(data, index) in usecases" :key="index">
                    <div class = usecaseName v-on:click="showUsecaseDetails()">
                        {{data.name}}
                    </div>
                    <div class="usecaseIcons">
                        <i class="edit fa fa-minus-circle" v-on:click="removeUseCase(index)"></i>
                        <i class="remove fa fa-edit" v-on:click="editUseCase(index)"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>


</template>


<script>
    import UserService from '../services/UserService';

    export default {
        name: 'UseCases',

        props: {
            projects: Array,
            usecases: Array,
            selectedProject: null,
            selectedUsecase: null,
        },

        data() {
            return {
                defaultUsecase: {
                    name: "default",
                },
            };
        },

        mounted() {
            this.dispUsecases();
        },

        methods: {

            dispUsecases() {
                if(this.selectedProject != null) {
                    this.usecases = this.projects[this.selectedProject].usecases;
                }
            },

            addUsecase() {
                const puid = this.projects[this.selectedProject].details.puid;
                UserService.createNewUseCase(this.defaultUsecase, puid);
            },

            editUsecase(id) {

            },

            removeUsecase(id) {
                this.usecases.splice(id, 1);
                // UserService.deleteUseCase(this.usecases[id].ucid,this.puid)
                // .then(res => {
                //     if(res.status === 200) {
                //         this.usecases.splice(id, 1);
                //     }
                // }); 
            },

            showUsecaseDetails() {
                alert("show uc deets");

            }
        },
    };
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    .usecaseIcons {
        flex-grow: 1;
    }

    .usecaseName {
        flex-grow: 8;
    }

    .addUsecase {
        padding: 10px;
        font-size: 1.3em;
        background-color: lightpink;
        cursor: pointer;
        color: black;
    }

    .addUsecase:hover {
        background-color: lightcoral;
    }

    .selectedProjectName {
        padding: 20px;
        text-align: left;
        font-size: 1.3em;
        color: black;
    }


    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul li {
        display: flex;
        flex-direction: row;
        padding: 10px;
        font-size: 1em;
        background-color: azure;
        border-bottom: 1px solid lightgrey;
        color: black;
        text-align: left;
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