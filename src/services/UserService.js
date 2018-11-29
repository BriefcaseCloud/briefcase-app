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
    getNewTemplate() {
        return Api().get('projects/template')
    }
}
