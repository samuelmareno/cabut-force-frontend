import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_BASE_URL}/pipelines/graphics`;

export default function pipelinesWithGraphics(token: string, startDate: string, endDate: string){
    return axios.create({
        baseURL: `${BASE_URL}/${startDate}/${endDate}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
}
