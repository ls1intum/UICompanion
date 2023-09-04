import axios from 'axios';
import * as FormData from "form-data";


export async function postPrototype(bytes: Uint8Array){
    try {
        const blob = new Blob([bytes], { type: 'application/octet-stream' });

        let data = new FormData();

        data.append('prototypes', blob, 'prototype.png');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/api/prototypes',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: data,
        };

        const response = await axios.request(config);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}
