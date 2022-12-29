import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

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