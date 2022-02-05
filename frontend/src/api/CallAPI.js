import axios from 'axios';


const getToken = JSON.parse(sessionStorage.getItem("token"))?.jwt;
const callAPI = axios.create({
    baseURL: 'http://localhost:9191/',
    headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-type": 'application/json'
    }
})
export default callAPI;
