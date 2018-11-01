import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('auth') //get users
  },
  fetchAuthToken (params) {
    return Api().post('auth', params) //request token
  }

}