import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/v1/pipelines';

export default function users(token: string){
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}