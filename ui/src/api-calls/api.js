import axios from 'axios';
//todo: use config for url

export const callRoot = async () => {
    const url = "http://localhost:8080/";
    const response = await axios.get(url)
        .then(resp => {
            console.log(resp.data);
            return resp.data;
        });
    return response;
}