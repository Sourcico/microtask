import axios from 'axios'

export default {
   
	addUser(data) {
       return axios.post('/user/register', data);
    }
}