import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('auth')
  },
  fetchAuthToken (params) {
    return Api().post('auth', params)
  }

}