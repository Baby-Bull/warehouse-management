import axios from 'axios';


const getToken = JSON.parse(sessionStorage.getItem("token"))?.jwt;
const callAPI = axios.create({
    baseURL: 'https://storage-management-backend-ndt.herokuapp.com/',
    headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-type": 'application/json'
    }
})
export default callAPI;
