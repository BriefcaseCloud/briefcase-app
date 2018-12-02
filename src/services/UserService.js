import Api from '@/services/Api'

export default {
    fetchUsers() {
        return Api().get('users')
    },
    fetchAuthToken(username) {
        return Api().post('auth', {username: username})
    },
    fetchProjects(uuid) {
        return Api().get('projects', {params: {uuid: uuid}})
    },
    createNewProject(project) {
        return Api().post('projects',{project: project})
    },
    deleteProject(project) {
        return Api().delete('projects',{data: {puid: `${project}`}})
    },
    getNewTemplate() {
        return Api().get('projects/template')
    },
    updateProject() {
        return Api().put('projects',{project: project})
    },
    createNewUseCase(usecase,puid) {
        return Api().post('usecases', {usecase: usecase, puid: puid})
    },
    deleteUseCase(ucid,puid) {
        return Api().delete('projects',{data: {puid: `${puid}`,ucid: `${ucid}`}})
    },
    shareProject(puid,users) {
        return Api().post('usecases/share', {users: users, puid: puid})
    }

}
