import axios from "axios";
const PATH = process.env.REACT_APP_BACKEND

export function getData() {
    return axios.get(`${PATH}/getData`);
}