import axios from 'axios'

export default {
   
	addElement(itemName) {
        return axios.post('/create', {name: itemName});
    },

    updateElement(index, data) {
        return axios.post('/update/' + index, data);
    },

    removeElement(index) {
        return axios.delete('/delete/' + index);
    },

    getListData() {
    	return axios.get('/list');
    }
}