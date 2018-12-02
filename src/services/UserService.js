import Api from '@/services/Api'

export default {
    fetchUsers() {
        return Api().get('users')
    },
    fetchAuthToken(params) {
        return Api().post('auth', params)
    },
    fetchProjects(params) {
        return Api().get('projects', {params: params})
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
    }
}
