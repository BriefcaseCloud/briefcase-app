<template>
    <div class="usecasePanel">
        <div class="usecaseHeader">
            <div class="selectedProjectName">
                <div v-if="selectedProject != null">
                    <b>{{projects[selectedProject].details.title}}</b>
                </div>
                <div v-else>
                    <b>No Project Selected...</b>
                </div>
            </div>
            <div class="addUsecase" v-on:click="addUsecase()">
                <i class="add fa fa-plus-circle"> </i>
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
                        {{data.details}}
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
            selectedProject: null,
        },

        data() {
            return {
                selectedUsecase: null,
                defaultUsecase: {
                    name: "sams super usecase",
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

            addUsecase() {
                const puid = this.projects[this.selectedProject].details.puid;
                UserService.createNewUseCase(this.defaultUsecase, puid);
            },

            editUsecase(id) {

            },

            removeUsecase(id) {
                UserService.deleteUseCase(this.usecases[id].ucid,this.puid)
                .then(res => {
                    if(res.status === 200) {
                        this.usecases.splice(id, 1);
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
        padding: 10px;
        font-size: 1.3em;
        background-color: lightpink;
        cursor: pointer;
        color: black;
    }

    .addUsecase:hover {
        background-color: lightcoral;
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