import Api from '@/services/Api'

export default {
    fetchUsers() {
        return Api().get('users')
    },
    fetchAuthToken(username) {
        return Api().post('auth', {username: username})
    },
    fetchProjects(uuid) {
        return Api().get(`users/${uuid}/projects`)
    },
    createNewProject(uuid) {
        return Api().post(`users/${uuid}/projects`)
    },
    deleteProject(project) {
        return Api().delete(`projects/${project}`)
    },
    updateProject(project) {
        return Api().put(`projects/${project.details.puid}`,{project: project})
    },
    createNewUseCase(puid) {
        return Api().post(`projects/${puid}/usecases`)
    },
    updateUseCase(puid,ucid,usecase){
        return Api().put(`projects/${puid}/usecases/${ucid}`,{usecase: usecase})
    },
    deleteUseCase(ucid,puid) {
        return Api().delete(`projects/${puid}/usecases/${ucid}`)
    },
    shareProject(puid,users) {
        return Api().post(`projects/${puid}/share`,{users: users})
    }

}
