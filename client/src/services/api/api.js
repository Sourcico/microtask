import axios from 'axios'

export default {
    getHome () {
        return axios.get('/home')
            .then(function (response) {
                / eslint-disable /
                console.log('RESPONSE in get home: ', response);
             })
            .catch(function (error) {
                / eslint-disable /
                console.log('ERROR in get home: ', error);
        });
    },

    postHome () {
        return axios.post('/home')
            .then(function (response) {
                / eslint-disable /
                console.log('RESPONSE in get home: ', response);
             })
            .catch(function (error) {
                / eslint-disable /
                console.log('ERROR in get home: ', error);
        });
    },

    deleteHome () {
        return axios.delete('/home')
            .then(function (response) {
                / eslint-disable /
                console.log('RESPONSE in get home: ', response);
             })
            .catch(function (error) {
                / eslint-disable /
                console.log('ERROR in get home: ', error);
        });
    },

    getListData() {
    	return axios.get('/list');
    	   //  await axios.get('/list')
        //     .then(function (response) {    
        //         console.log('RESPONSE GET LIST DATA ', response.data.data);
        //         return response.data.data;
        //      })
        //     .catch(function (error) {
        //         / eslint-disable /
        //         console.log('ERROR in get home: ', error);
        // });
    }
}