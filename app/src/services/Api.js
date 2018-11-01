import axios from 'axios' //library for http requests

export default() => {
  return axios.create({
    baseURL: `http://localhost:3000`
  })
}