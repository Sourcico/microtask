import axios from 'axios'

export default {
   
	addElement(itemName) {
		//console.log(itemName);
        return axios.post('/create', {name: itemName});
    },

    // updateElement(index) {
    //     return axios.post('/update/', + index);
    // },


    removeElement(index) {
        
        return axios.delete('/delete/' + index);

    },

    getListData() {
    	return axios.get('/list');
    }
}